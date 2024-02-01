const express = require('express');
const routes = express.Router();
const managerModel = require('../models/manager');
const mongoose = require('mongoose');

// Get All Managers
routes.get("/managers", async (req, res) => {
    try {
        const managerList = await managerModel.find();
        res.status(200).json(managerList);
    } catch (error) {
        console.error("Error retrieving managers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add NEW Manager
routes.post("/managers", async (req, res) => {
    try {
        const newManager = new managerModel(req.body);
        const savedManager = await newManager.save();
        res.status(201).json(savedManager);
    } catch (error) {
        console.error("Error adding manager:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Update existing Manager By Id
routes.put("/managers/:mid", async (req, res) => {
    try {
        const updatedManager = await managerModel.findByIdAndUpdate(req.params.mid, req.body, { new: true });
        res.status(200).json(updatedManager);
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Get Manager By Id
routes.get("/managers/:mid", async (req, res) => {
    try {
        const managerId = req.params.mid;
        const manager = await managerModel.findById(managerId);
        if (!manager) {
            return res.status(404).json({ status: false, message: 'Manager not found' });
        }
        res.status(200).json({ status: true, data: tenant });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Delete Manager By Id
routes.delete("/managers", async (req, res) => {
    try {
        const managerId = req.query.mid;
        const deletedManager = await managerModel.findByIdAndRemove(managerId);
        if (!deletedManager) {
            return res.status(404).json({ status: false, message: 'Manager not found' });
        }
        res.status(204).json({ status: true, message: 'Tenant deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Manager Login
routes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const manager = await managerModel.findOne({ username });
        if (!manager || manager.password !== password) {
            return res.status(401).json({ status: false, message: 'Invalid username or password' });
        }

        res.status(200).json({
            status: true,
            message: 'Manager logged in successfully',
        });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

module.exports = routes;