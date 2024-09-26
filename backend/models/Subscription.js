const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const subsriptionSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email format validation
  },
  subscribedOn: {
    type: Date,
    default: Date.now // Auto-sets the created date
  }
});

// Create the User model
const Subscription = mongoose.model('Subscription', subsriptionSchema);

module.exports = Subscription;
