import express from 'express';
import { createShortUrlController, getUrlStatsController } from '../controllers/urlController.js';

const router = express.Router();

router.post('/urls', createShortUrlController);
router.get("/stats/:shortCode", getUrlStatsController);


export default router; 