import axios from 'axios';

const API = axios.create({ baseURL: `http://localhost:8000` });

// Add a request interceptor to include the token in all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('instaxtoken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const signIn = (credentials) => API.post('/auth/signin', credentials);
export const signUp = (userData) => API.post('/auth/signup', userData);
export const googleSignIn = (userData) => API.post('/auth/google', userData);
export const findUserByEmail = (email) => API.get(`/auth/findbyemail?email=${email}`);
export const generateOtp = (email, name, reason) => API.get(`/auth/generateotp?email=${email}&name=${name}&reason=${reason}`);
export const verifyOtp = (otp) => API.get(`/auth/verifyotp?code=${otp}`);
export const resetPassword = (email, password, userType) => API.put(`/auth/forgetpassword`, { email, password, userType });

// User API
export const getUsers = () => API.get('/user');
export const searchUsers = (search) => API.get(`/users/search/${search}`);
export const getProfile = () => API.get('/users/profile');
export const updateProfile = (userData) => API.put('/users/profile', userData);

// Post API
export const createPost = (postData) => API.post('/posts', postData);
export const getPosts = (page = 1, limit = 10) => API.get(`/posts?page=${page}&limit=${limit}`);
export const getPost = (postId) => API.get(`/posts/${postId}`);
export const updatePost = (postId, updateData) => API.put(`/posts/${postId}`, updateData);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const likePost = (postId) => API.post(`/posts/${postId}/like`);
export const unlikePost = (postId) => API.post(`/posts/${postId}/unlike`);
export const sharePost = (postId) => API.post(`/posts/${postId}/share`);
// Comment API
export const createComment = (postId, commentData) => API.post(`/posts/${postId}/comments`, commentData);
export const getComments = (postId) => API.get(`/posts/${postId}/comments`);
export const deleteComment = (postId, commentId) => API.delete(`/posts/${postId}/comments/${commentId}`);
export const addComment = (postId, commentData) => API.post(`/posts/${postId}/comments`, commentData);
// Video API (keeping existing endpoints)
export const createVideo = (video) => API.post('/videos', video);
export const getVideos = () => API.get('/videos');
export const addEpisodes = (video) => API.post('/videos/episode', video);
export const favoriteVideo = (id) => API.post(`/videos/favorit`, { id: id });
export const getRandomVideo = () => API.get('/videos/random');
export const getVideoByTags = (tags) => API.get(`/videos/tags?tags=${tags}`);
export const getVideoByCategory = (category) => API.get(`/videos/category?q=${category}`);
export const getMostPopularVideo = () => API.get('/videos/mostpopular');
export const getVideoById = (id) => API.get(`/videos/get/${id}`);
export const addView = (id) => API.post(`/videos/addview/${id}`);
export const searchVideo = (search) => API.get(`/videos/search?q=${search}`);

export default API;
