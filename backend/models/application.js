const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 50 },
  occupation: { type: String, required: true, unique: true, maxlength: 50 },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  income: { type: Number, required: true },
  phone_number: { type: Number, required: true },
});

module.exports = mongoose.model('Application', applicationSchema);