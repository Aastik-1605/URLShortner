import AppError from "../utils/AppError.js";

const validateShortCode = (req, res, next) => {
  const { shortCode } = req.params;
  const regex = /^[a-zA-Z0-9]+$/;

  if(!shortCode || !regex.test(shortCode)){
    throw new AppError("Invalid shortCode", 400)
  }

  next();
}

export default validateShortCode;