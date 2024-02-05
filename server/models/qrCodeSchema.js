const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: false,
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
  // Add other QR code-related fields as needed
});

const QRCode = mongoose.model("QRCode", qrCodeSchema);

module.exports = QRCode;
