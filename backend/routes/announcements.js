const express = require('express');
const Announcement = require('../models/announcement'); // Adjust the path to where your model is located
const router = express.Router();

// Get All Announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 }); // This will return all announcements sorted by date in descending order
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Make an Announcement
router.post('/', async (req, res) => {
  const { title, body } = req.body;
  const announcement = new Announcement({
    title,
    body,
    // date is set by default
  });

  try {
    const newAnnouncement = await announcement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an Announcement
router.delete('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

    await announcement.remove();
    res.json({ message: 'Deleted Announcement' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;