import express from 'express';
import { createPost, getFeed } from '../controllers/postController.js';

const router = express.Router();

// POST /api/posts - Create a new post
router.post('/', createPost);

// GET /api/posts/feed - Get the social timeline
router.get('/feed', getFeed);

export default router;