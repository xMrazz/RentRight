const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const mongoose = require('mongoose');

// Add listing
router.post('/', async (req, res) => {
  try {
    const listing = new Listing(req.body);
    await listing.save();
    res.status(201).send(listing);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Remove listing by unitNum
router.delete('/:unitNum', async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({ unitNum: req.params.unitNum });
    if (!listing) return res.status(404).send();
    res.send(listing);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Edit listing by unitNum
router.patch('/:unitNum', async (req, res) => {
  try {
    const listing = await Listing.findOneAndUpdate({ unitNum: req.params.unitNum }, req.body, { new: true });
    if (!listing) return res.status(404).send();
    res.send(listing);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.send(listings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get listing by unitNum
router.get('/:unitNum', async (req, res) => {
  try {
    const listing = await Listing.findOne({ unitNum: req.params.unitNum });
    if (!listing) return res.status(404).send();
    res.send(listing);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;