import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Redis connected!");
  } catch (error) {
    console.error("Redis connection error:", error.message);
    process.exit(1);
  }
};

export { client, connectRedis };