const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
const mongoose = require('./config/mongodb');

//mongoose.connect('mongodb://localhost:27017/property-portal');

// Configure middleware
app.use(cors());
app.use(bodyParser.json());

// Load routes
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/property', propertyRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
