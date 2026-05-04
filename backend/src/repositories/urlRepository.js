import Url from '../models/urlModel.js';

const saveUrl = async (shortCode, longUrl) => {
  const newUrl = await Url.create({
    shortCode,
    longUrl,
  });

  return newUrl;
}

const findByShortCode = async (shortCode) => {
  const url = await Url.findOne({ shortCode });

  return url;
}

const incrementClickCount = async(shortCode) => {
  await Url.findOneAndUpdate(
    {shortCode},
    { $inc: {clickCount: 1}},
  )
}

export { saveUrl, findByShortCode, incrementClickCount};