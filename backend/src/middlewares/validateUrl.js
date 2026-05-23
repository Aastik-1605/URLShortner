import AppError from "../utils/AppError.js";

const validateUrl = (req, res, next) => {
  const { longUrl } = req.body;

  if (!longUrl || typeof longUrl !== "string") {
    throw new AppError("Invalid URL", 400);
  }

  try {
    new URL(longUrl);
  } catch (err) {
    throw new AppError("Invalid URL format", 400);
  }
  
  next();
}

export default validateUrl;