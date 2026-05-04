import express from 'express';
import urlRoutes from './routes/urlRoutes.js';
import redirectRoutes from './routes/redirectRoutes.js';
import rateLimiter from './middlewares/rateLimiter.js';

const app = express();

app.use(express.json());

// health should be open
app.get('/health', (req, res) => {
  res.json({ status: 'OK Bye'});
});

// apply rate limiter AFTER health
// API routes
app.use("/api", rateLimiter, urlRoutes);

// Redirect routes (NO prefix)
app.use("/", rateLimiter, redirectRoutes);


export default app;