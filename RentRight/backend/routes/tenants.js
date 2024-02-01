const express = require('express');
const routes = express.Router();
const tenantModel = require('../models/tenant');
const mongoose = require('mongoose');

// Get All Tenants
routes.get("/tenants", async (req, res) => {
    try {
        const tenantList = await tenantModel.find();
        res.status(200).json(tenantList);
    } catch (error) {
        console.error("Error retrieving tenants:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Add NEW Tenant
routes.post("/tenants", async (req, res) => {
    try {
        const newTenant = new tenantModel(req.body);
        const savedTenant = await newTenant.save();
        res.status(201).json(savedTenant);
    } catch (error) {
        console.error("Error adding tenant:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Update existing Tenant By Id
routes.put("/tenants/:tid", async (req, res) => {
    try {
        const updatedTenant = await tenantModel.findByIdAndUpdate(req.params.tid, req.body, { new: true });
        res.status(200).json(updatedTenant);
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Get Tenant By Id
routes.get("/tenants/:tid", async (req, res) => {
    try {
        const tenantId = req.params.tid;
        const tenant = await tenantModel.findById(tenantId);
        if (!tenant) {
            return res.status(404).json({ status: false, message: 'Tenant not found' });
        }
        res.status(200).json({ status: true, data: tenant });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Delete Tenant By Id
routes.delete("/tenants", async (req, res) => {
    try {
        const tenantId = req.query.tid;
        const deletedTenant = await tenantModel.findByIdAndRemove(tenantId);
        if (!deletedTenant) {
            return res.status(404).json({ status: false, message: 'Tenant not found' });
        }
        res.status(204).json({ status: true, message: 'Tenant deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

// Tenant Login
routes.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const tenant = await tenantModel.findOne({ email });
        if (!tenant || tenant.password !== password) {
            return res.status(401).json({ status: false, message: 'Invalid username or password' });
        }

        res.status(200).json({
            status: true,
            message: 'Tenant logged in successfully',
        });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});

module.exports = routes;