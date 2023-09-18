const express = require('express');
const verifyToken = require('./middlewares/verifyToken');
const app = express();

// Import the routes
const authRouter = require('./routes/auth');
const propertyRouter = require('./routes/property');

// Import the mongoose object
const mongoose = require('./config/mongodb');

// Register the routes
app.use('/api/auth', authRouter);
app.use('/api/property', propertyRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
