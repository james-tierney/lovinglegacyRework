const express = require("express");
const axios = require("axios");
const app = express();
const QRCodeModel = require("../models/qrCodeSchema");
// const port = 3001;

// app.use(express.json());

module.exports.generateQrCode = async (req, res) => {
  try {
    const data = {
      workspace: "87f85a47-1d7f-4114-8ce8-8bdeb544c4ca",
      //qr_data: "http://localhost:5173/signUp",
      qr_data: req.body.qrData, // Assuming you send qrData in the request body
      primary_color: "#3b81f6",
      background_color: "#FFFFFF",
      dynamic: true,
      display_name: "Tester QR Code", // Customize as needed
      frame: "border",
      has_border: true,
      logo_url: "https://hovercode.com/static/website/images/logo.png",
      generate_png: true,
    };

    const response = await axios.post(
      "https://hovercode.com/api/v2/hovercode/create/",
      data,
      {
        headers: {
          Authorization: "Token c32d9270112fc2dd35d011071bcf8643a6446bae",
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );
    const qrCodeData = response.data;

    // Save the generated qr_id without associating it with any user
    const newQRCode = new QRCodeModel({
      qrCodeData: qrCodeData.qr_id,
    });
    await newQRCode.save();
    // Log the generated QR code data to the console
    console.log("Generated QR Code Data:", qrCodeData);
    res.json(qrCodeData);
  } catch (error) {
    console.error("Error generating QR Code:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
