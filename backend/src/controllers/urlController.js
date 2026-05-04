import {createShortUrlService, findUrlByShortCode, getUrlStats} from "../services/urlService.js";

const createShortUrlController = async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl || typeof longUrl !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    new URL(longUrl);
  } catch (err) {
    return res.status(400).json({ error: "Invalid URL format" });
  }
  
  const result = await createShortUrlService(longUrl);
  res.status(201).json(result);
}

const getOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;
  
  const urlData = await findUrlByShortCode(shortCode);

  if(!urlData){
    return res.status(404).json({error: "Url not found"});
  }

  res.redirect(urlData.longUrl);
}

const getUrlStatsController = async (req, res) => {
  const { shortCode } = req.params;
 
  const stats = await getUrlStats(shortCode);
  if(!stats){
    return res.status(404).json({error: "Stats not found"});
  }

  return res.status(200).json(stats);
}

export { createShortUrlController, getOriginalUrl, getUrlStatsController };