// commentController.mjs
import Comment from '../models/Comment.mjs';
import Post from '../models/Post.mjs';
import { validationResult } from 'express-validator';
import { createComment as createCommentService, getComments as getCommentsService, deleteComment as deleteCommentService } from '../services/commentService.mjs';
import AppError from '../utils/AppError.mjs';


export const createComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const comment = await createCommentService(req.user.id, req.params.postId, req.body.text);
    res.status(201).json({ comment });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await getCommentsService(req.params.postId);
    res.json({ comments });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    await deleteCommentService(req.params.commentId, req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
export const updateComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { userId, text } = req.body;

  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, user: userId },
      { text },
      { new: true, runValidators: true }
    );

    if (!comment) {
      throw new AppError('Comment not found or you are not authorized to update it', 404);
    }

    res.json(comment);
  } catch (error) {
    next(error);
  }
};
