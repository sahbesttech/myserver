// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const ActivationCode = require('../models/ActivationCode');


const app = express();
app.use(express.json()); // Middleware to parse JSON 

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(process.env.MONGO_URI, {

})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Sample route for testing the server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Activation endpoint (to be implemented further)
app.post('/activate', async (req, res) => {
    const { code, deviceId } = req.body;
  
    if (!code || !deviceId) {
      return res.status(400).json({ success: false, message: "Missing code or deviceId" });
    }
  
    try {
      const activationCode = await ActivationCode.findOne({ code });
  
      if (!activationCode) {
        return res.status(400).json({ success: false, message: "Invalid activation code, please contact the developer of the app, sahbest for genuine activation code" });
      }
  
      if (activationCode.used) {
        if (activationCode.deviceId === deviceId) {
          return res.status(200).json({ success: true, message: "Already activated on this device" });
        } else {
          return res.status(400).json({ success: false, message: "Activation code already used on another device" });
        }
      }
  
      // Mark the code as used and associate it with this device
      activationCode.used = true;
      activationCode.deviceId = deviceId;
      await activationCode.save();
  
      return res.status(200).json({ success: true, message: "Activation successful" });
    } catch (error) {
      console.error("Activation error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });
  

// Define the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 