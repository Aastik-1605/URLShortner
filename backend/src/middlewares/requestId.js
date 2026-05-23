import crypto from "crypto";

const requestId = (req, res, next) => {
  req.requestId = crypto.randomUUID();

  next();
};

export default requestId;