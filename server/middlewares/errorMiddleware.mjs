const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({ 
            error: 'Validation Error', 
            details: Object.values(err.errors).map(error => error.message)
        });
    }
  
    // JWT authentication error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
    }
  
    // Custom error handling
    if (err.statusCode) {
        return res.status(err.statusCode).json({ error: err.message });
    }
  
    // Default to 500 server error
    res.status(500).json({ error: 'Internal Server Error' });
};

export default errorMiddleware;
