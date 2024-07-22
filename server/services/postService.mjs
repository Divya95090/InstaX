import Post from '../models/Post.mjs';

export const createPost = async (userId, postData) => {
  const post = new Post({
    user: userId,
    ...postData
  });
  await post.save();
  return post.populate('user', 'username profilePicture');
};

export const getPosts = async (page = 1, limit = 10, userId = null) => {
  let query = {};
  if (userId) query.user = userId;

  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('user', 'username profilePicture')
    .populate({
      path: 'comments',
      options: { limit: 5, sort: { createdAt: -1 } },
      populate: { path: 'user', select: 'username profilePicture' }
    });
  return posts;
};

export const getPost = async (postId) => {
  return Post.findById(postId)
    .populate('user', 'username profilePicture')
    .populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } },
      populate: { path: 'user', select: 'username profilePicture' }
    });
};

export const updatePost = async (postId, userId, updateData) => {
  const post = await Post.findOneAndUpdate(
    { _id: postId, user: userId },
    updateData,
    { new: true, runValidators: true }
  ).populate('user', 'username profilePicture');
  if (!post) throw new Error('Post not found or you are not authorized to update it');
  return post;
};

export const deletePost = async (postId, userId) => {
  const post = await Post.findOneAndDelete({ _id: postId, user: userId });
  if (!post) throw new Error('Post not found or you are not authorized to delete it');
  // Consider deleting associated comments here
  return post;
};

export const likePost = async (postId, userId) => {
  const post = await Post.findByIdAndUpdate(
    postId,
    { $addToSet: { likes: userId } },
    { new: true }
  ).populate('user', 'username profilePicture');
  if (!post) throw new Error('Post not found');
  return post;
};

export const unlikePost = async (postId, userId) => {
  const post = await Post.findByIdAndUpdate(
    postId,
    { $pull: { likes: userId } },
    { new: true }
  ).populate('user', 'username profilePicture');
  if (!post) throw new Error('Post not found');
  return post;
};