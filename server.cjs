require('dotenv').config({ path: './server/.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./server/config/db');
const errorHandler = require('./server/middleware/errorHandler');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static('server/uploads'));

// Routes
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/patient', require('./server/routes/patient'));
app.use('/api/doctor', require('./server/routes/doctor'));

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'EHR NOW API is running'
    });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});

module.exports = app;
