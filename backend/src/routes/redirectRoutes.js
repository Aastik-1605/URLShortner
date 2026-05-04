import express from 'express';
import { getOriginalUrl } from '../controllers/urlController.js';

const router = express.Router();

router.get('/:shortCode', getOriginalUrl);

export default router; 