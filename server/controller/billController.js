const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001;

app.use(express.json());

app.post("/generateQrCode", async (req, res) => {
  try {
    const data = {
      workspace: "87f85a47-1d7f-4114-8ce8-8bdeb544c4ca",
      qr_data: req.body.qrData, // Assuming you send qrData in the request body
      primary_color: "#3b81f6",
      background_color: "#FFFFFF",
      dynamic: true,
      display_name: "Tester QR Code", // Customize as needed
      frame: "circle-viewfinder",
      pattern: "Diamonds",
      has_border: true,
      logo_url: "https://hovercode.com/static/website/images/logo.png",
      generate_png: true,
    };

    const response = await axios.post(
      "https://hovercode.com/api/v2/hovercode/create/",
      data,
      {
        headers: {
          Authorization: "c32d9270112fc2dd35d011071bcf8643a6446bae", // Replace with your actual Hovercode API token
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );
    const qrCodeData = response.data;

    // Log the generated QR code data to the console
    console.log("Generated QR Code Data:", qrCodeData);
    res.json(qrCodeData);
  } catch (error) {
    console.error("Error generating QR Code:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3002:${port}`);
});
