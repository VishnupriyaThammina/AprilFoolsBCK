const mongoose = require('mongoose');

async function connectDB(uri) {
    try {
        await mongoose.connect(uri);  // No need for deprecated options
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('Error in DB connection:', error.message);
        console.error('Error details:', error);
    }
}

module.exports = connectDB;
