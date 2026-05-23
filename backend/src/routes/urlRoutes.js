import express from 'express';
import { createShortUrlController, getUrlStatsController } from '../controllers/urlController.js';
import validateUrl from '../middlewares/validateUrl.js';
import validateShortCode from '../middlewares/validateShortCode.js';

const router = express.Router();

router.post('/urls', validateUrl, createShortUrlController);
router.get("/stats/:shortCode", validateShortCode, getUrlStatsController);


export default router; 