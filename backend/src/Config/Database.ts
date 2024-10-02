// config/database.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Retry connection after 5 seconds
    setTimeout(mongoDB, 5000);
  }
};

export { mongoDB };