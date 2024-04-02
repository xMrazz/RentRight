const express = require('express');
const routes = express.Router();
const requestModel = require('../models/request');
const mongoose = require('mongoose');

// Get All Requests
routes.get("/", async (req, res) => {
    try {
        const requestList = await requestModel.find();
        res.status(200).json(requestList);
    } catch (error) {
        console.error("Error retrieving requests:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add NEW Request
routes.post("/", async (req, res) => {
    try {
        const newRequest = new requestModel(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        console.error("Error adding request:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Update existing Request By Id
routes.put("/:rid", async (req, res) => {
    try {
        const updatedRequest = await requestModel.findByIdAndUpdate(req.params.rid, req.body, { new: true });
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Get Request By Id
routes.get("/:rid", async (req, res) => {
    try {
        const requestId = req.params.rid;
        const request = await requestModel.findById(requestId);
        if (!request) {
            return res.status(404).json({ status: false, message: 'Request not found' });
        }
        res.status(200).json({ status: true, data: tenant });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

module.exports = routes;