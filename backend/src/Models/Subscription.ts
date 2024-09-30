import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Subscription document
interface ISubscription extends Document {
  email: string;
  subscribedOn: Date;
}

// Define the subscription schema
const subscriptionSchema = new Schema<ISubscription>({
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

// Create and export the Subscription model
const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;