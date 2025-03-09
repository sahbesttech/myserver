// populate.js
require('dotenv').config();
const mongoose = require('mongoose');

// Import your ActivationCode model (make sure the path is correct)
const ActivationCode = require('../models/ActivationCode');

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    insertCodes(); // Once connected, insert the codes
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);
  });

// Array of activation codes to insert
const codes = [
];

// Function to insert the codes into the database
async function insertCodes() {
  try {
    // Use insertMany to add multiple documents at once
    const result = await ActivationCode.insertMany(codes);
    console.log('Activation codes inserted:', result);
  } catch (error) {
    console.error('Error inserting activation codes:', error);
  } finally {
    // Close the connection when done
    mongoose.connection.close();
  }
}
