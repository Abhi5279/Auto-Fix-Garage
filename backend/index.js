const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/ServiceRequest');

const mongodburi = process.env.MONGO_DB_URL;

const app = express();
const port = 3000;

// CORS config
const allowedOrigins = ['http://localhost:5173', 'https://garage-management-site-frontend.onrender.com'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DB Connection
mongoose.connect(`${mongodburi}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('✅ Connected to MongoDB');
    const db = mongoose.connection;
    console.log('📦 Connected to DB name:', db.name);
    console.log('🌐 Connected to host:', db.host);
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
