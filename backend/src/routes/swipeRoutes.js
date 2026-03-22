import express from 'express';
import { handleSwipe, getRecommendations } from '../controllers/swipeController.js';

const router = express.Router();

router.post('/swipe', handleSwipe);

router.get('/recommendations/:userId', getRecommendations);

export default router;