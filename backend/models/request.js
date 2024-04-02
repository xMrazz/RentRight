const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  unit: { type: Number, required: true },   
  description: { type: String, required: true, unique: true, maxlength: 500 },
  status: { type: String, required: true, enum: ['Open', 'Closed', 'In Progress'] }
});

module.exports = mongoose.model('Request', requestSchema);