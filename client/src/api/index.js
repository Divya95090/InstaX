import axios from 'axios';

const API = axios.create({ baseURL: `https://instax.onrender.com/api` });

// Auth
export const signIn = async ({ email, password,userType}) => await API.post('/auth/signin', { email, password });
export const signUp = async ({
    name,
    email,
    password,
}) => await API.post('/auth/signup', {
    name,
    email,
    password,
});
export const googleSignIn = async ({
    name,
    email,
    img,
}) => await API.post('/auth/google', {
    name,
    email,
    img,
});
export const findUserByEmail = async (email) => await API.get(`/auth/findbyemail?email=${email}`);
export const generateOtp = async (email, name, reason) => await API.get(`/auth/generateotp?email=${email}&name=${name}&reason=${reason}`);
export const verifyOtp = async (otp) => await API.get(`/auth/verifyotp?code=${otp}`);
export const resetPassword = async (email, password,user) => await API.put(`/auth/forgetpassword`, { email, password,userType: user.userType });

// User API
export const getUsers = async (token) => await API.get('/user', {
    headers: { "Authorization": `Bearer ${token}` },
    withCredentials: true
});
export const searchUsers = async (search, token) => await API.get(`/users/search/${search}`, {
    headers: { "Authorization": `Bearer ${token}` },
    withCredentials: true
});


// Video API (formerly Podcast API)
export const createVideo = async (video, token) => await API.post('/videos', video, {
    headers: { "Authorization": `Bearer ${token}` },
    withCredentials: true
});
export const getVideos = async () => await API.get('/videos');
export const addEpisodes = async (video, token) => await API.post('/videos/episode', video, {
    headers: { "Authorization": `Bearer ${token}` },
    withCredentials: true
});
export const favoriteVideo = async (id, token) => await API.post(`/videos/favorit`, { id: id }, {
    headers: { "Authorization": `Bearer ${token}` },
    withCredentials: true
});
export const getRandomVideo = async () => await API.get('/videos/random');
export const getVideoByTags = async (tags) => await API.get(`/videos/tags?tags=${tags}`);
export const getVideoByCategory = async (category) => await API.get(`/videos/category?q=${category}`);
export const getMostPopularVideo = async () => await API.get('/videos/mostpopular');
export const getVideoById = async (id) => await API.get(`/videos/get/${id}`);
export const addView = async (id) => await API.post(`/videos/addview/${id}`);
export const searchVideo = async (search) => await API.get(`/videos/search?q=${search}`);
