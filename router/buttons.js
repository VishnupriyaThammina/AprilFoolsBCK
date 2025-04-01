const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('../utils/jwt');
const User = require('../model/user');
const authMiddleware = require('../middleware/auth');

// Button 1: Auth bypass by setting value to true
// Button 1: Auth bypass by setting "bypass" to true in the request body
router.post('/bypass', (req, res) => {
    try {
        const { bypass } = req.body;  // Expecting a "bypass" field in the request body
        
        if (bypass === "April") {
            res.json({ message: 'Dev is the fool', isAuthenticated: true });
        } else {
            res.status(403).json({ message: 'April, April! who is the fool?' });
        }
    } catch (error) {
        console.error('Error in auth bypass:', error);
        res.status(500).json({ message: 'April, April! who is the fool?' });
    }
});


// Button 2: IDOR - Get user details without proper auth
router.get('/tea/:bun', async (req, res) => {
    try {
        // Fetch the user based on the userId
        const user = await User.findOne({ userId: req.params.bun }, 'description');  // Only fetch description field
        
        if (user) {
            res.json({ description: user.description });  // Send back only description
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user description:', error);
        res.status(500).json({ message: 'Error fetching user description' });
    }
});



// Button 3: Use public secret for JWT
router.post('/kiwi', async (req, res) => {
    const { SuperSPY } = req.body;

    if (SuperSPY === process.env.SPY) {
        const token = generateToken({ id: '12345' });
        res.json({ token });
    } else {
        res.status(403).json({ message: 'SPY not in Database' });
    }
});


// Button 4: Provide JWT to get username list
// Button 4: Provide JWT to get username list
router.get('/fruit_chocolate', authMiddleware, async (req, res) => {
    try {
        // Verify the JWT through the authMiddleware

        // Fetch the usernames of all users
        const users = await User.find({}, 'username');
        
        // Send back the list of usernames
        res.json(users);
    } catch (error) {
        // console.error('Error fetching usefruitsrs:', error);
        res.status(500).json({ message: 'Error fetching usefruitsrs' });
    }
});


// Button 5: Username + JWT → Fetch password
// Button 5: Username + JWT → Fetch password
router.post('/kiwi_papaya', authMiddleware, async (req, res) => {
    try {
        const { life_of_papaya } = req.body; // Use the "life_of_papaya" term

        // Validate if the "life_of_papaya" (username) is provided
        if (!life_of_papaya) {
            return res.status(400).json({ message: 'Kiwi and Papaya are inseparable! You need the life of Papaya to fetch Kiwi.' });
        }

        // Fetch the user from the database based on the "life_of_papaya"
        const user = await User.findOne({ username: life_of_papaya }); // Ensure it matches with the username field

        if (user) {
            res.json({ password: user.password });
        } else {
            res.status(404).json({ message: 'Life of Papaya? Not found!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Kiwi and Papaya :/ !' });
    }
});


module.exports = router;
