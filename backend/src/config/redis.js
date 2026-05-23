import { createClient } from "redis";
import logger from "../utils/logger.js";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  logger.warn(err, "Redis unavailable")
});

const connectRedis = async () => {
  try {
    await client.connect();
    logger.info("Redis connected!");
  } catch (error) {
    logger.warn(error, "Redis failed, fallback to DB");
  }
};

const closeRedis = async () => {
  try {
    if (client.isOpen) {
      await client.quit();
      logger.info("Redis disconnected!");
    }
  } catch (error) {
    logger.error(error, "Redis disconnection error");
  }
};

export { client, connectRedis, closeRedis };