const mongoose = require('mongoose');

const activationCodeSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  used: { type: Boolean, default: false },
  deviceId: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('ActivationCode', activationCodeSchema);
