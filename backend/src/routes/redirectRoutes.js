import express from 'express';
import { getOriginalUrl } from '../controllers/urlController.js';
import validateShortCode from '../middlewares/validateShortCode.js';

const router = express.Router();

router.get('/:shortCode', validateShortCode, getOriginalUrl);

export default router; 