const mongoose = require('../config/mongoose');

//user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  userType: { type: String, enum: ['admin', 'user'], default: 'user' },
  assignedReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  myReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
