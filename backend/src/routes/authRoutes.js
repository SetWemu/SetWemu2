import express from 'express';
// Note: We import 'login' as a named import from the controller
import { login } from '../controllers/authController.js'; 

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Authenticates a user and updates last_login
 * @access  Public
 */
router.post('/login', login);

// Export the router to be used in index.js
export default router;