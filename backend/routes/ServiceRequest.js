const express = require('express');
const ServiceRequest = require('../models/ServiceRequestModel');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'your_super_secret_key';

// Middleware to check auth
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Create a service request (protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newRequest = new ServiceRequest({
      ...req.body,
      userId: req.user.id,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get requests by user (protected)
router.get('/user/:id', authMiddleware, async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ userId: req.params.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user requests' });
  }
});

// Admin: Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await ServiceRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
});

// Admin: Update status of a request
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;

  try {
    const updated = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ status: 'success', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRequest = await ServiceRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ status: 'fail', message: 'Request not found' });
    }
    res.json({ status: 'success', message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: 'Deletion failed' });
  }
});

module.exports = router;
