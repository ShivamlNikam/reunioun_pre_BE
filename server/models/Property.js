const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  id: { type: String, required: true },
  city: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  sqft: { type: Number, required: true },
  //other metrics 
  //amenities: { type: [String], required: true },
  //locality: { type: String, required: true },
  //address: { type: String, required: true },
});

module.exports = mongoose.model('Property', PropertySchema);
