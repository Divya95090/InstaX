// commentRoutes.mjs
import express from 'express';
import { body } from 'express-validator';
import {
  createComment,
  getComments,
  deleteComment,
  updateComment
} from '../controllers/commentController.mjs';
import authMiddleware from '../middlewares/authMiddleware.mjs';

const router = express.Router();

// POST /comments/:postId
router.post('/:postId', authMiddleware, [
  body('text').trim().isLength({ min: 1 }).escape()
], createComment);

// GET /comments/:postId
router.get('/:postId', getComments);

// DELETE /comments/:commentId
router.delete('/:commentId', authMiddleware, deleteComment);

// PUT /comments/:commentId
router.put('/:commentId', authMiddleware, updateComment);

export default router;
