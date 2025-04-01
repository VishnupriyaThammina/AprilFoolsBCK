// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Add user route
router.post('/add-user-3105-789', async (req, res) => {
    try {
        const { userId, username, password, description } = req.body;

        // Validate input
        if (!userId || !username || !password) {
            return res.status(400).json({ message: 'userId, Username and password are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            userId,  // Manually assign userId
            username,
            password,
            description,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
});

module.exports = router;
