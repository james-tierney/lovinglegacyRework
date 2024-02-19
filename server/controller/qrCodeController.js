const express = require("express");
const axios = require("axios");
const app = express();
const QRCodeModel = require("../models/qrCodeSchema");
const fs = require("fs");
const PDFDocument = require("pdfkit");
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

    //update qr code data to be profile url with username
    const profileURL = `http://localhost:5173/userProfile?username=${username}`;
    // Update the generated QR codes data
    await this.updateQrCodeData({
      qrCodeId: qrCodeRecord.qrCodeId,
      qrData: profileURL,
      // qrData: qrCodeRecord.qrCodeData,
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
    const url = `http://localhost:5173/signUp?qr_id=${qrId}`;
    const data = {
      name: "MyQRCode",
      type: "url",
      // link_id: 123, // Optional: Replace with your desired value
      // project_id: 456, // Optional: Replace with your desired value
      style: "square", // Optional: Replace with your desired value
      inner_eye_style: "square", // Optional: Replace with your desired value
      outer_eye_style: "square", // Optional: Replace with your desired value
      foreground_type: "color", // Optional: Replace with your desired value
      foreground_color: "#000000", // Optional: Replace with your desired value
      background_color: "#FFFFFF", // Optional: Replace with your desired value
      url: url, // Add the URL parameter here
      // Add more parameters as needed
    };

    // const data = {
    //   workspace: "87f85a47-1d7f-4114-8ce8-8bdeb544c4ca",
    //   qr_data: `http://localhost:5173/signUp?qr_id=${qrId}`,
    //   //qr_data: req.body.qrData, // Assuming you send qrData in the request body
    //   primary_color: "#3b81f6",
    //   background_color: "#FFFFFF",
    //   dynamic: true,
    //   display_name: "Tester QR Code", // Customize as needed
    //   frame: "border",
    //   has_border: true,
    //   logo_url: "https://hovercode.com/static/website/images/logo.png",
    //   generate_png: true,
    // };

    // const response = await axios.post(
    //   "https://hovercode.com/api/v2/hovercode/create/",
    //   data,
    //   {
    //     headers: {
    //       Authorization: "Token c32d9270112fc2dd35d011071bcf8643a6446bae",
    //       "Content-Type": "application/json",
    //     },
    //     timeout: 10000,
    //   }
    // );
    const formData = new FormData();
    formData.append("name", "MyQRCode");
    formData.append("type", "url");
    formData.append("style", "square");
    formData.append("inner_eye_style", "square");
    formData.append("outer_eye_style", "square");
    formData.append("foreground_type", "color");
    formData.append("foreground_color", "#000000");
    formData.append("background_color", "#FFFFFF");
    formData.append("url", url);

    const apiKey = "0cb3c873b79270cab5696d21be90f047"; // hide through env file
    console.log("api key ", apiKey);
    const response = await axios.post(
      "https://qrcodedynamic.com/api/qr-codes",
      formData,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Extract data from the response
    const qrCodeId = response.data.data.id;
    console.log("response from generating qr code = ", qrCodeId);

    const qrCodeData = await getQrCode(qrCodeId, apiKey);
    console.log("get qr code = ", qrCodeData);
    // const qrCodeData = await response.data;
    // console.log("qr code data", qrCodeData);
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

const getQrCode = async (qrCodeId, apiKey) => {
  try {
    const response = await axios.get(
      `https://qrcodedynamic.com/api/qr-codes/${qrCodeId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching QR code:", error.message);
    throw error;
  }
};

const storeQrCodes = (qrData) => {};

// Function to export QR Codes to PDF
const exportQrCodeImagesToPDF = async (qrCodesData) => {
  try {
    const doc = new PDFDocument();
    for (const qrCodeData of qrCodesData) {
      // Fetch the QR Code image from the data
      const response = await axios.get(qrCodeData.png, {
        responseType: "arraybuffer",
      });
      const qrCodeImage = Buffer.from(response.data, "binary");

      // Embed the QR code Image in the PDF
      doc.image(qrCodeImage, { width: 200, height: 200 });
      doc.text(qrCodeData.qr_data);
      doc.addPage();
    }

    // Save the PDF document
    const outputPath = "../qrPDFS/qr_codes.pdf";
    doc.pipe(fs.createWriteStream(outputPath));
    doc.end();
    return outputPath; // Return the path to the generated PDF
  } catch (error) {
    throw new Error(`Error exporting QR codes to PDF: ${error.message}`);
  }
};

module.exports.batchGenerateQrCodes = async (req, res) => {
  try {
    const numberOfCodes = req.query.numberOfCodes;
    const qrCodesData = [];

    // Generate QR codes and collect their data
    for (let i = 0; i < numberOfCodes; i++) {
      // Generate a unique ID for each QR code
      const qrId = generateUniqueId();

      const data = {
        workspace: "87f85a47-1d7f-4114-8ce8-8bdeb544c4ca",
        qr_data: `http://localhost:5173/signUp?qr_id=${qrId}`,
        primary_color: "#3b81f6",
        background_color: "#FFFFFF",
        dynamic: false, // just for testing generate static
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

      // Save the generated QR code data
      qrCodesData.push(qrCodeData);
    }

    // Export QR code data to a PDF
    const pdfPath = await exportQrCodeImagesToPDF(qrCodesData);
    res.json({ message: "QR codes exported to PDF successfully", pdfPath });
  } catch (error) {
    console.error("Error generating QR codes:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// module.exports.batchGenerateQrCodes = async (req, res) => {
//   try {
//     const numberOfCodes = req.query.numberOfCodes; // Assuming the client sends the number of QR codes to generate in the request body
//     console.log("number of codes = ", numberOfCodes);
//     const qrCodesData = [];
//     for (let i = 0; i < numberOfCodes; i++) {
//       // Generate a unique ID for each QR code
//       const qrId = generateUniqueId();

//       const data = {
//         workspace: "87f85a47-1d7f-4114-8ce8-8bdeb544c4ca",
//         qr_data: `http://localhost:5173/signUp?qr_id=${qrId}`,
//         primary_color: "#3b81f6",
//         background_color: "#FFFFFF",
//         dynamic: false, // just for testing generate static
//         display_name: "Tester QR Code", // Customize as needed
//         frame: "border",
//         has_border: true,
//         logo_url: "https://hovercode.com/static/website/images/logo.png",
//         generate_png: true,
//       };

//       const response = await axios.post(
//         "https://hovercode.com/api/v2/hovercode/create/",
//         data,
//         {
//           headers: {
//             Authorization: "Token c32d9270112fc2dd35d011071bcf8643a6446bae",
//             "Content-Type": "application/json",
//           },
//           timeout: 10000,
//         }
//       );
//       const qrCodeData = response.data;

//       // Save the generated QR code data without associating it with any user
//       const newQRCode = new QRCodeModel({
//         qrCodeData: qrCodeData.qr_data,
//         targetUrl: `http://localhost:5173/signUp?qr_id=${qrId}`,
//         qrCodeId: qrCodeData.id,
//         generatedId: qrId,
//       });
//       // commented out saving to DB For now so DB not clogged when testing
//       //await newQRCode.save();
//       console.log("New QR code stored ", newQRCode);
//       console.log("qr codes data array ", qrCodesData);

//       qrCodesData.push(qrCodeData);
//     }

//     // Log the generated QR code data to the console
//     console.log("Generated QR Code Data:", qrCodesData);
//     res.json(qrCodesData);
//   } catch (error) {
//     console.error("Error generating QR Code:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
