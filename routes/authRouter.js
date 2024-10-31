import express from 'express';
import { registerUser, loginUser, getTotalUser, logoutUser } from '../controller/authController.js';
import { protectedMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', protectedMiddleware, logoutUser)
router.get('/get-user', protectedMiddleware, getTotalUser)

export default router
