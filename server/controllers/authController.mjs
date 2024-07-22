import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/emailService.mjs';
import config from '../config/config.mjs';

const client = new OAuth2Client(config.googleClientId);

export const register = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');

    user = new User({
      name,
      email,
      password,
      userType,
      verificationToken,
    });

    await user.save();

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password)) || user.userType !== userType) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, userType: user.userType } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const googleSignIn = async (req, res) => {
  try {
    const { token, userType } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId,
    });
    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        img: picture,
        userType,
        isVerified: true,
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

    res.status(200).json({ token: jwtToken, user: { id: user._id, name: user.name, email: user.email, userType: user.userType } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User found', userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const generateOtp = async (req, res) => {
  try {
    const { email, name, reason } = req.query;
    const otp = Math.floor(100000 + Math.random() * 900000);
    // TODO: Implement OTP storage and email sending
    res.status(200).json({ message: 'OTP generated and sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { code } = req.query;
    // TODO: Implement OTP verification
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const createComment = async (userId, postId, text) => {
  const comment = new Comment({
    user: userId,
    post: postId,
    text
  });
  await comment.save();
  await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
  return comment.populate('user', 'username profilePicture');
};

export const getComments = async (postId, page = 1, limit = 10) => {
  return Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('user', 'username profilePicture');
};

export const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findOneAndDelete({ _id: commentId, user: userId });
  if (!comment) throw new Error('Comment not found or you are not authorized to delete it');
  await Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });
  return comment;
};

export const updateComment = async (commentId, userId, text) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: commentId, user: userId },
    { text },
    { new: true, runValidators: true }
  );
  if (!comment) throw new Error('Comment not found or you are not authorized to update it');
  return comment;
};