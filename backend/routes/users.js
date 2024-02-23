const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

// Get All Users (Tenants or Managers)
router.get("/", async (req, res) => {
    const { role } = req.query;
    let filter = {};
    if (role) filter.role = role; 

    try {
        const users = await User.find(filter);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add New User (Tenant or Manager)
// Bcrypt for password hashing
router.post("/", async (req, res) => {
    const { password, ...otherDetails } = req.body;

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ ...otherDetails, password: hashedPassword });
        const savedUser = await newUser.save();

        const { password: _, ...userData } = savedUser._doc;

        res.status(201).json(userData);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Update User By Id
router.put("/:uid", async (req, res) => {
    const { password, ...otherUpdates } = req.body;

    try {
        // If password needs to be updated, this will hash the new password
        let update = { ...otherUpdates };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.uid, update, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Get User By Id
router.get("/:uid", async (req, res) => {
    try {
        const user = await User.findById(req.params.uid);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Delete User By Id
router.delete("/:uid", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.uid);
        if (!deletedUser) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        res.status(204).json({ status: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

module.exports = router;