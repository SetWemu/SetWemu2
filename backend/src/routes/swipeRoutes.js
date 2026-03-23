import express from 'express';
import { handleSwipe, getRecommendations } from '../controllers/swipeController.js';

const router = express.Router();

// Path: POST /api/swipe/interact
router.post('/interact', handleSwipe);

// Path: GET /api/swipe/recommendations/:userId
router.get('/recommendations/:userId', getRecommendations);

export default router;