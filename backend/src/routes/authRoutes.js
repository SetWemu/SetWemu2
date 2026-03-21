import express from 'express';
import { login, signup } from '../controllers/authController.js'; 

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Registers a new user and creates a profile via DB trigger
 * @access  Public
 */
router.post('/signup', signup);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticates a user and updates last_login
 * @access  Public
 */
router.post('/login', login);

export default router;