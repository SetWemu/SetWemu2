import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

router.get('/:id', getProfile);     // Get info for a specific user
router.patch('/:id', updateProfile); // Update info for a specific user

export default router;