// authRoutes.mjs
import express from 'express';
import {
  register,
  verifyEmail,
  login,
  googleSignIn,
  forgotPassword,
  resetPassword,
  findUserByEmail,
  generateOtp,
  verifyOtp,
  createComment,
  getComments,
  deleteComment,
  updateComment
} from '../controllers/authController.mjs';

const router = express.Router();

router.post('/register', register);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', login);
router.post('/signin', login); // Add this line
router.post('/google-signin', googleSignIn);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Add these routes to match your frontend API calls
router.get('/findbyemail', findUserByEmail);
router.get('/generateotp', generateOtp);
router.get('/verifyotp', verifyOtp);
router.put('/forgetpassword', resetPassword);

export default router;
