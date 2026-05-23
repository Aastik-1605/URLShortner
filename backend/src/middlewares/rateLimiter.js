import { client } from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
  if (!client.isReady) {
    return next();
  }
  try {
    const ip = req.ip;

    const key = `rate_limit:${ip}`;

    // Increment request count
    const requests = await client.incr(key); 

    const WINDOW = process.env.RATE_LIMIT_WINDOW || 60;
    const MAX = process.env.RATE_LIMIT_MAX || 5;

    // Set expiry only for first request
    if(requests === 1){
      await client.expire(key, WINDOW); // 60 seconds window
    }

    // Limit check
    if(requests > MAX){
      return res.status(429).json({
        error: "Too many requests. Try again later."
      })
    }

    console.log(`IP: ${ip}, Requests: ${requests}`);

    next(); // allow request

  } catch (error) {
    console.error("Rate limiter error:", error.message);

    // Fail open (important design choice)
    next();
  }
}

export default rateLimiter;