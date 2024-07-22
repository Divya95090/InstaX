import * as postService from '../services/postService.mjs';

export const createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.user.id, req.body, req.files);
    res.status(201).json({ post });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts();
    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await postService.updatePost(req.params.id, req.user.id, req.body);
    res.json({ post });
  } catch (error) {
    next(error);
  }
};

export const savePost = async (req, res, next) => {
  try {
    await postService.savePost(req.params.id, req.user.id);
    res.json({ message: 'Post saved successfully' });
  } catch (error) {
    next(error);
  }
};

export const unsavePost = async (req, res, next) => {
  try {
    await postService.unsavePost(req.params.id, req.user.id);
    res.json({ message: 'Post unsaved successfully' });
  } catch (error) {
    next(error);
  }
};