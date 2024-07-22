// userRoutes.mjs
import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  getProfile,
  updateProfile,
  getUsers,
  searchUsers
} from '../controllers/userController.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.post('/register', [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], login);

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, [
  body('bio').optional().trim().escape(),
  body('profilePicture').optional().isURL()
], updateProfile);

router.get('/', authMiddleware, getUsers);
router.get('/search/:search', authMiddleware, searchUsers);

export default router;
