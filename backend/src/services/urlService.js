import { saveUrl, findByShortCode, incrementClickCount } from "../repositories/urlRepository.js";
import { client } from "../config/redis.js";
import getNextSequence from "../utils/generateId.js";
import encodeBase62 from "../utils/base62.js";

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

  try {
    cached = await client.get(shortCode);

    if(cached){
      incrementClickCount(shortCode); // non-blocking
      return { longUrl: cached };
    };
  } catch (error) {
    console.error("Redis failed, fallback to DB");
  }


  // Fetch from DB
  const url = await findByShortCode(shortCode);

  if(!url) return null;

  // Store in cache
  try {
    await client.set(shortCode, url.longUrl, {
      EX: 3600, // expires in 1 hour
    });
  } catch (err) {
    console.error("Redis set failed");
  }

  // Increment click count (non-blocking)
  incrementClickCount(shortCode);

  return url;

}

const getUrlStats = async (shortCode) => {
  const url =await findByShortCode(shortCode);
  if(!url) return null;

  return {
    shortCode: url.shortCode,
    longUrl: url.longUrl,
    clickCount: url.clickCount,
    createdAt: url.createdAt,
  };
}

export  {createShortUrlService, findUrlByShortCode, getUrlStats};