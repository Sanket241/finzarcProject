import express from 'express';
import { register, login, getProfile } from '../Controllers/userController.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

export default router;
