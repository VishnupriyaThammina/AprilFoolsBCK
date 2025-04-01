// model/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },  // Numeric userId
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String, required: false },
}, {
    timestamps: true  // Automatically track creation and updates
});

module.exports = mongoose.model('User', userSchema);
