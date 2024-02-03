const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  qrCodeData: {
    type: String,
    required: true,
  },
  // Add other QR code-related fields as needed
});

const QRCode = mongoose.model("QRCode", qrCodeSchema);

module.exports = QRCode;
