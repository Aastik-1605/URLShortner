import {createShortUrlService, findUrlByShortCode, getUrlStats} from "../services/urlService.js";
import asyncHandler from "../utils/asyncHandler.js";

const createShortUrlController = asyncHandler(async (req, res) => {
  const result = await createShortUrlService(req.body.longUrl);

  res.status(201).json(result);
});



const getOriginalUrl = asyncHandler(async (req, res) => {
  
  const urlData = await findUrlByShortCode(req.params.shortCode);

  res.redirect(urlData.longUrl);
});


const getUrlStatsController = asyncHandler(async (req, res) => {
 
  const stats = await getUrlStats(req.params.shortCode);

  return res.status(200).json(stats);
});

export { createShortUrlController, getOriginalUrl, getUrlStatsController };