// config/config.js

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database configuration
  dbUri: process.env.MONGODB_URI || 'mongodb+srv://dvyakhandelwal95090:yQQH8a802IvMJLNX@instaxcluster0.0ua5opu.mongodb.net/',

  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',

  // Email configuration (if you're using email services)
  emailService: process.env.EMAIL_SERVICE || 'gmail',
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,

  // Google OAuth (if you're using Google Sign-In)
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  // File upload configuration
  uploadDir: process.env.UPLOAD_DIR || 'uploads/',
  maxFileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB

  // API configuration
  apiPrefix: '/api',

  // Cors configuration
  corsOrigin: process.env.CORS_ORIGIN || '*',

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',

  // Security
  bcryptSaltRounds: 10,
};

export default config;