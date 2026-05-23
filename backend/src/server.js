import dotenv from "dotenv";
dotenv.config();
import app from './app.js';
import {connectDB, closeDB} from './config/db.js';
import { connectRedis, closeRedis } from './config/redis.js';
import logger from "./utils/logger.js";

const startServer = async () => {
  try {
    await connectDB();
    connectRedis();
    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });


    const gracefulShutdown = async () => {

      const shutdownTimeout = setTimeout(() => {
        logger.error("Taking too long to shutdown, FORCEFULLY EXIT!")
        process.exit(1);
      }, 10000);

      logger.info("SHUTDOWN STARTED!!");

      server.close(async () => {
        await closeDB();
        await closeRedis();
        clearTimeout(shutdownTimeout);
        logger.info("SERVER CLOSED SUCCESSFULLY!!");
        process.exit(0)
      });

    }

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);

  } catch (error) {
    logger.error(error, "Failed to start server");
    process.exit(1);
  }

};

startServer();

