const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/ServiceRequest');

const app = express();
const port = 3000;

// CORS config
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/Garage-DataBase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/service-request', serviceRoutes);

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
