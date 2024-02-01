const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  last_name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 50 },
  password: { type: String, required: true, maxlength: 25 },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  phone_number: { type: Number, required: true },
  unit: { type: Number, required: true },
  payment: { type: Number, required: true },
});

module.exports = mongoose.model('Tenant', tenantSchema);