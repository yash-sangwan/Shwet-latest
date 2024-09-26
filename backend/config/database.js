/* Database configuration file */
/* Add MongoDB connection settings here */
// config/database.js

const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI , {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        setTimeout(mongoDB, 5000);
    });
};

module.exports= {mongoDB};