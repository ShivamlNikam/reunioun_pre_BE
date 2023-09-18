const express = require('express');
const Property = require('../models/Property');
const verifyToken = require('../middlewares/jwt');
const User = require('../models/User');
const router = express.Router();

router.use(verifyToken);

// Fetch all available properties
router.get('/list-properties', async (req, res) => {
  const properties = await Property.find();

  res.send(properties);
});

// Add a property
router.post('/property', async (req, res) => {
  try {
    const property = new Property({
      id: req.body.id,
      city: req.body.city,
      //locality: req.body.locality,
      //address: req.body.address,
      price: req.body.price,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      sqft: req.body.sqft,
      //amenities: req.body.amenities,
      owner: req.userId,
    });

    await property.save();

    res.send(property);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while creating the property.' });
  }
});

// Update a property
router.put('/property/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    // Check if the property exists
    if (!property) {
      return res.status(404).send('Property not found');
    }
    // Extract the string in "" from the property owner
    const PO = property.owner.toHexString();
    // Check if the user is the owner of the property
    if (PO !== req.userId) {
      return res.status(403).send('You are not authorized to update this property');
    }
    // Update the property with the new values
    await Property.updateOne(
      { _id: property._id },
      {
        city: req.body.city,
        price: req.body.price,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        sqft: req.body.sqft,
      }
    );
    // Get the updated property
    const updatedProperty = await Property.findById(property._id);
    res.send(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the property.');
  }
});

router.delete('/property/:id', async (req, res) => {
  const property = await Property.findById(req.params.id);
  // Check if the property exists
  if (!property) {
    return res.status(404).send('Property not found');
  }

  // Extract the string in "" from the property owner
  const PO = property.owner.toHexString();
  // Check if the user is the owner of the property
  if (PO !== req.userId) {
    return res.status(403).send('You are not authorized to delete this property');
  }

  try {
    await property.delete();
    res.send('Property deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the property.');
  }
});

// List my properties
router.get('/property', async (req, res) => {
  const properties = await Property.find({ owner: req.userId });
  res.send(properties);
});

module.exports = router;