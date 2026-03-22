import express from 'express';
import { toggleFollow, getFollowStats } from '../controllers/followController.js';

const router = express.Router();

router.post('/toggle', toggleFollow);
router.get('/stats/:userId', getFollowStats);

export default router;