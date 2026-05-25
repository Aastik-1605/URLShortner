import express from 'express';
import urlRoutes from './routes/urlRoutes.js';
import redirectRoutes from './routes/redirectRoutes.js';
import rateLimiter from './middlewares/rateLimiter.js';
import errorHandler from './middlewares/errorMiddleware.js';
import mongoose from 'mongoose';
import { client } from './config/redis.js';
import requestLogger from './middlewares/requestLogger.js';
import requestId from './middlewares/requestId.js';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(requestId);

app.use(requestLogger);

app.use(express.json());

// health should be open
app.get('/health', (req, res) => {

  const dbHealthy = mongoose.connection.readyState === 1;
  const redisHealthy = client.isReady;

  res.json({ 
    "status": dbHealthy ? "OK" : "ERROR",
    "uptime": process.uptime(),
    "timestamp": new Date().toISOString(),
    "database": dbHealthy ? "connected" : "not connected",
    "redis": redisHealthy ? "connected" : "not connected"
  });
});


// apply rate limiter AFTER health
// API routes
app.use("/api", rateLimiter, urlRoutes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Redirect routes (NO prefix)
app.use("/", rateLimiter, redirectRoutes);

// Global Error Middleware (ALWAYS LAST)
app.use(errorHandler);

export default app;