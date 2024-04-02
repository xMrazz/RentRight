const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  address: { type: String, required: true, maxlength: 200 },
  unitNum: { type: Number, required: true, unique: true },
  bedroomNum: { type: Number, required: true },
  bathroomNum: { type: Number, required: true },
  price: { type: String, required: true, maxlength: 50 },
  imageUrls: [{ type: String }], // this is for Cloudinary
});

module.exports = mongoose.model('Listing', listingSchema);