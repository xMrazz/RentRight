const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ status: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: false, message: 'Invalid email or password' });
        }

        res.status(200).json({
            status: true,
            message: `${user.role} logged in successfully`,
            user: { 
                name: user.first_name,
                role: user.role 
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

module.exports = router;