import express from 'express';
import { getOriginalUrl } from '../controllers/urlController.js';
import validateShortCode from '../middlewares/validateShortCode.js';

const router = express.Router();

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Redirect to original URL
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
 *       302:
 *         description: Redirects browser to original URL. Best tested directly in browser.
 *       404:
 *         description: URL not found
 */
router.get('/:shortCode', validateShortCode, getOriginalUrl);

export default router; 