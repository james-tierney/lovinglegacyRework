const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  profile: {
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    // Add other profile fields as needed
  },
  qrCodeData: {
    type: String,
    required: true,
  },
  targetUrl: {
    type: String,
    required: false,
  },
  qrCodeId: {
    type: String,
    required: true,
  },
  generatedId: {
    type: String,
    required: true,
  },
  hasProfileAssociated: {
    type: Boolean,
    required: true,
  },
  // Add other QR code-related fields as needed
});

const QRCode = mongoose.model("QRCode", qrCodeSchema);

module.exports = QRCode;
