const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 50 },
  password: { type: String, required: true, minlength: 6, maxlength: 255 },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  phone_number: { type: Number, required: false },
  unit: { type: Number, required: false },
  payment: { type: Number, required: false },
  role: { type: String, required: true, enum: ['Tenant', 'Manager'] }
});

module.exports = mongoose.model('User', userSchema);