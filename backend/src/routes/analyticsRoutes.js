import express from 'express';
import { getEventAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

// GET /api/analytics/:eventId
router.get('/:eventId', getEventAnalytics);

export default router;