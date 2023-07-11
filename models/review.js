const mongoose = require('../config/mongoose');

//review schema
const reviewSchema = new mongoose.Schema({
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedFor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  state: { type: String, enum: ['open', 'closed'], default: 'open' }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
