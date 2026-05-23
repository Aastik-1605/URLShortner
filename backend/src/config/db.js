import mongoose from 'mongoose';
import logger from '../utils/logger.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error(error, "MongoDB connection error");
    process.exit(1);
  }
}

const closeDB = async () => {
  try {
    await mongoose.connection.close()
    logger.info("MongoDB disconnected");
  } catch (error) {
    logger.error(error, "MongoDB disconnection error");
  }
}

export {connectDB, closeDB};