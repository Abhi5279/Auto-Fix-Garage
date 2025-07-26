const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  problemType: { type: String, required: true },
  otherIssue: { type: String, default: '' },
  dateTime: { type: Date, required: true },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);
