import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.mjs';

export const registerUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });
  return { token, user: user.toJSON() };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });
  return { token, user: user.toJSON() };
};

export const getProfile = async (userId) => {
  return User.findById(userId).select('-password');
};

export const updateProfile = async (userId, updateData) => {
  return User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select('-password');
};

export const followUser = async (userId, followId) => {
  await User.findByIdAndUpdate(userId, { $addToSet: { following: followId } });
  return User.findByIdAndUpdate(followId, { $addToSet: { followers: userId } }, { new: true }).select('-password');
};

export const unfollowUser = async (userId, unfollowId) => {
  await User.findByIdAndUpdate(userId, { $pull: { following: unfollowId } });
  return User.findByIdAndUpdate(unfollowId, { $pull: { followers: userId } }, { new: true }).select('-password');
};

export const searchUsers = async (query, page = 1, limit = 10) => {
  return User.find({ $text: { $search: query } })
    .select('-password')
    .skip((page - 1) * limit)
    .limit(limit);
};

export const getUserStats = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  
  return {
    postsCount: await Post.countDocuments({ user: userId }),
    followersCount: user.followers.length,
    followingCount: user.following.length
  };
};