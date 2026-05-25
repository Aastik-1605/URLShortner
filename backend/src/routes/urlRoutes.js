import express from 'express';
import { createShortUrlController, getUrlStatsController } from '../controllers/urlController.js';
import validateUrl from '../middlewares/validateUrl.js';
import validateShortCode from '../middlewares/validateShortCode.js';

const router = express.Router();

/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Create a shortened URL
 *     tags:
 *       - URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 example: https://google.com
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *       400:
 *         description: Invalid URL
 */
router.post('/urls', validateUrl, createShortUrlController);

/**
 * @swagger
 * /api/stats/{shortCode}:
 *   get:
 *     summary: Get URL statistics
 *     tags:
 *       - URL
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Short code of the URL
 *     responses:
 *       200:
 *         description: URL statistics retrieved successfully
 *       404:
 *         description: URL not found
 */
router.get("/stats/:shortCode", validateShortCode, getUrlStatsController);


export default router; 