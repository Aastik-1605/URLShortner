import { saveUrl, findByShortCode, incrementClickCount } from "../repositories/urlRepository.js";
import { client } from "../config/redis.js";
import getNextSequence from "../utils/generateId.js";
import encodeBase62 from "../utils/base62.js";
import AppError from "../utils/AppError.js"
import logger from "../utils/logger.js";

const createShortUrlService = async (longUrl) => {
  const id = await getNextSequence("url");
  
  const shortCode = encodeBase62(id);

  await saveUrl(shortCode, longUrl);

  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

  return { shortUrl };
}


const findUrlByShortCode = async(shortCode) => {
   //  Check cache
  let cached = null;

  logger.info("Step 1");
  
  if(client.isReady){
    try {
      cached = await client.get(shortCode);
  
      if(cached){
        incrementClickCount(shortCode) // non-blocking
            .catch(err => logger.error(err, "Click count update failed"));
        return { longUrl: cached };
      };
    } catch (error) {
      logger.warn(error, "Redis failed, fallback to DB");
    }
  }


  // Fetch from DB
  const url = await findByShortCode(shortCode);

  if (!url) {
    throw new AppError("URL not found", 404);
  }

  // Store in cache
  if(client.isReady){
    try {
      await client.set(shortCode, url.longUrl, {
        EX: 3600, // expires in 1 hour
      });
    } catch (err) {
      logger.warn(err, "Redis set failed");
    }
  }

  // Increment click count (non-blocking)
  incrementClickCount(shortCode)
      .catch(err => logger.error(err, "Click count update failed"));
  return url;

}

const getUrlStats = async (shortCode) => {
  const url = await findByShortCode(shortCode);
  if (!url) {
    throw new AppError("URL not found", 404);
  }

  return {
    shortCode: url.shortCode,
    longUrl: url.longUrl,
    clickCount: url.clickCount,
    createdAt: url.createdAt,
  };
}

export  {createShortUrlService, findUrlByShortCode, getUrlStats};