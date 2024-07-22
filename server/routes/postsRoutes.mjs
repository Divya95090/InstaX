import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import Post from '../models/Post.mjs';
import User from '../models/User.mjs';
import auth from '../middlewares/authMiddleware.mjs';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Create a new post
router.post('/', auth, upload.array('media', 5), async (req, res) => {
  try {
    const { content, category } = req.body;
    const media = req.files.map(file => ({
      type: file.mimetype.startsWith('image') ? 'image' : 'video',
      url: `/uploads/${file.filename}`
    }));

    const newPost = new Post({
      user: req.user.id,
      content,
      media,
      category
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { content, category } = req.body;
    post.content = content || post.content;
    post.category = category || post.category;

    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save (bookmark) a post
router.post('/:id/save', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (user.savedPosts.includes(post._id)) {
      return res.status(400).json({ message: 'Post already saved' });
    }

    user.savedPosts.push(post._id);
    await user.save();

    res.json({ message: 'Post saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unsave (remove bookmark) a post
router.post('/:id/unsave', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const index = user.savedPosts.indexOf(post._id);
    if (index === -1) {
      return res.status(400).json({ message: 'Post not saved' });
    }

    user.savedPosts.splice(index, 1);
    await user.save();

    res.json({ message: 'Post unsaved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
