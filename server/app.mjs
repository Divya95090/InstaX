// app.mjs
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Add this import
import config from './config/config.mjs';
// Configure environment variables
dotenv.config();
console.log(`Server running on port ${config.port}`);
const app = express();

// Get the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors()); // Add this line to enable CORS
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
import authRoutes from './routes/authRoutes.mjs';
app.use('/api/auth', authRoutes);

import postsRoutes from './routes/postsRoutes.mjs';
app.use('/api/posts', postsRoutes);

// Add these routes if they're not already in separate files
import userRoutes from './routes/userRoutes.mjs';
app.use('/api/users', userRoutes);

import commentRoutes from './routes/commentRoutes.mjs';
app.use('/api/comments', commentRoutes);

// Remove the PORT and app.listen from here, as it's now in server.mjs

export default app;