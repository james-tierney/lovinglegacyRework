const express = require("express");
const axios = require("axios");
const app = express();
const QRCodeModel = require("../models/qrCodeSchema");
// const port = 3001;

// app.use(express.json());

const { v4: uuidv4 } = require("uuid");

const generateUniqueId = () => {
  return uuidv4();
};

module.exports.passQrCodeProfileData = async (req, res) => {
  try {
    const { username, qrId } = req.body;

    // call the server side function
    await this.updateQRCodeWithUserProfile(username, qrId);

    // Client Response
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating QR code with user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to update the QR code with the user's profile information
module.exports.updateQRCodeWithUserProfile = async (username, qrId) => {
  console.log("QR code id inside update code with profile func ", qrId);
  try {
    // Retrieve the QR code record based on qrId
    const qrCodeRecord = await QRCodeModel.findOne({ generatedId: qrId });

    // Logic if the qrCode doesn't exist
    // TODO check if a profile is tied to the qr code
    // if not profile then the data for this qr code remains
    // to point to sign up page
    if (!qrCodeRecord) {
      console.error("QR code not found");
      return;
    }

    // Update the QR code record with the user's info
    // updating the profile part of schema just with username for now
    qrCodeRecord.profile = { username };
    // TODO add other user-related fields as needed
    console.log("qr code record ", qrCodeRecord);
    // Update the generated QR codes data
    await this.updateQrCodeData({
      qrCodeId: qrCodeRecord.qrCodeId,
      qrData: qrCodeRecord.qrCodeData,
    });

    // Save the updated QR code record to the database
    await qrCodeRecord.save();
    console.log(`QR code (${qrId}) associated with user (${username})`);
  } catch (error) {
    console.error("Error updating QR code:", error);
  }
};

module.exports.updateQrCodeData = async (qrCodeId, qrData, res) => {
  try {
    // const { qrCodeId } = qrCodeId; // Assuming you have the QR code ID in the request parameters
    // const { qrData } = qrData; // New QR data and display name

    const data = {
      qr_data: qrCodeId.qrData + "lol", // New QR data
    };
    console.log("qr Code for update ", qrCodeId);
    const response = await axios.put(
      `https://hovercode.com/api/v2/hovercode/${qrCodeId.qrCodeId}/update/`,
      data,
      {
        headers: {
          Authorization: "Token c32d9270112fc2dd35d011071bcf8643a6446bae",
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating QR code:", error);
    //res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.generateQrCode = async (req, res) => {
  try {
    // Generate a unique ID for the qr Code
    const qrId = generateUniqueId();

    const data = {
      workspace: "87f85a47-1d7f-4114-8ce8-8bdeb544c4ca",
      qr_data: `http://localhost:5173/signUp?qr_id=${qrId}`,
      //qr_data: req.body.qrData, // Assuming you send qrData in the request body
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
    // console.log("qr code data ", qrCodeData);

    // Save the generated qr_id without associating it with any user
    const newQRCode = new QRCodeModel({
      qrCodeData: qrCodeData.qr_data,
      targetUrl: `http://localhost:5173/signUp?qr_id=${qrId}`,
      qrCodeId: qrCodeData.id,
      generatedId: qrId,
    });
    await newQRCode.save();
    console.log("New QR code stored ", newQRCode);
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
