const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    body: { type: String, required: true, maxlength: 1500 },
    date: { type: Date, default: Date.now } 
  });
  
  module.exports = mongoose.model('Announcement', announcementSchema);