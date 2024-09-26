const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
    minlength: 3 // Minimum length for the username
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Minimum password length
  },
  isVerified: {
    type: Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now // Auto-sets the created date
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
