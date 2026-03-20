import express from 'express';
import { toggleFavorite, getUserFavorites } from '../controllers/favoriteController.js';

const router = express.Router();

router.post('/toggle', toggleFavorite);
router.get('/:userId', getUserFavorites);

export default router;