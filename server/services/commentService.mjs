import Comment from '../models/Comment.mjs';
import Post from '../models/Post.mjs';

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

export const getComments = async (postId) => {
  return Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate('user', 'username profilePicture');
};

export const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findOneAndDelete({ _id: commentId, user: userId });
  if (!comment) throw new Error('Comment not found or you are not authorized to delete it');
  await Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });
  return comment;
};
