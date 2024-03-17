// profileController.js
const Profile = require("../models/Profile");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { profile } = require("console");
const { file } = require("pdfkit");
const axios = require("axios");
require("dotenv").config();
const sharp = require("sharp");

const cloudinary = require("cloudinary").v2;

const admin = require("firebase-admin");
const { getStorage, getDownloadURL } = require("firebase-admin/storage");

const serviceAccount = require("../lovinglegacy-24acc-firebase-adminsdk-klemw-28879c9685.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://lovinglegacy-24acc.appspot.com",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { formatDate } = require("../utils");

const createProfile = async (req, res) => {
  try {
    const { username, email, qrCodeId } = req.body;
    console.log("username = ", username);
    console.log("email = ", email);

    // Check if the username already exists in MongoDB
    const existingProfile = await Profile.findOne({ username });

    if (existingProfile) {
      // Username already taken, send a response with a 409 status code (Conflict)
      return res.status(409).json({ error: "Username already taken" });
    }
    console.log(
      "QR Code ID that is being used in the createProfile ",
      qrCodeId
    );
    // Create a new profile in MongoDB
    const newProfile = new Profile({
      username: username,
      profileId: uuidv4(), // Generating a unique ID using uuid
      email: email,
      qrCodeId: qrCodeId, // this is the qr code associated with this users profile
      dateCreated: new Date(), // Account creation date
    });

    // Save the profile to MongoDB
    const savedProfile = await newProfile.save();

    // Generate JWT token (optional)
    const token = jwt.sign(
      { profileId: savedProfile.profileId },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send the token to the client via a cookie (optional)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Change this to true in production
      sameSite: "strict",
    });

    // Respond with the profile and token
    res.status(201).json({ profile: savedProfile, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfileByUsername = async (req, res) => {
  console.log("req = ", req.query.username);
  try {
    const username = req.query.username; //req.params;

    /** username is undefined here as it is part of the url
     * rather than it being a request param
     * we should look at the best approach methods
     * to retrieving user data from the db
     * do we encode the ID's or create our own id?
     */
    console.log("username in here = ", username);
    // Retrieve the user profile based on the username
    const userProfile = await Profile.findOne({ username });
    console.log("user profile = ", JSON.stringify(userProfile));
    // Logic for user profile not existing
    if (!userProfile) {
      console.log("error occurs in here ");
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("error is here", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfileByQrId = async (req, res) => {
  console.log("in get profile by id req.query = ", req.query);
  const { qr_id } = req.query;
  console.log("qr id from query ", qr_id);
  try {
    //req.params;

    /** username is undefined here as it is part of the url
     * rather than it being a request param
     * we should look at the best approach methods
     * to retrieving user data from the db
     * do we encode the ID's or create our own id?
     */

    // Retrieve the user profile based on the username
    const userProfile = await Profile.findOne({ qrCodeId: qr_id });
    console.log("user profile = ", JSON.stringify(userProfile));
    // Logic for user profile not existing
    if (!userProfile) {
      console.log("error occurs in here ");
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("error is here", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const compressAndSaveImage = async (profilePicture, imagePath) => {
  try {
    await sharp(profilePicture)
      .resize({ width: 400 })
      .jpeg({ quality: 80 })
      .toFile(imagePath);
    console.log("image compressed and saved successfully ", imagePath);
  } catch (error) {
    console.error("Error compressing and saving image:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

async function uploadProfilePicture(path) {
  console.log("inside profile pciture func path = ", path);
  const bucket = admin.storage().bucket();
  const uploadedFile = await bucket.upload(path);
  console.log("uploaded file = ", uploadedFile);
  const [metadata] = await uploadedFile[0].getMetadata();
  console.log("upload file metadata = ", metadata);
  const unsignedUrl = await getDownloadURL(uploadedFile[0]);
  console.log("unsigned url = ", unsignedUrl);
  const downloadUrl = uploadedFile[0].getSignedUrl({
    action: "read",
    expires: "01-01-2028",
  });
  console.log("download url = ", downloadUrl[0]);
  return unsignedUrl;
}

const createMedallionProfile = async (req, res) => {
  // console.log("req = ", req);
  const medallionData = req.body;
  console.log("medallionData = ", JSON.stringify(medallionData));
  // console.log("image file path ", req.file.path);
  console.log("image file ", req.file);

  const profilePicture = {
    data: fs.readFileSync(req.file.path), // Read file from disk and store as Buffer
    contentType: req.file.mimetype, // Access content type of the uploaded file
  };
  console.log("req.body", req.body);
  const {
    username,
    firstName,
    middleName,
    lastName,
    bio,
    headlineText,
    linkToObituary,
    birthDate,
    deathDate,
    city,
    state,
    quoteSection,
  } = req.body; // Access other form fields

  const formattedBirthDate = formatDate(birthDate);
  const formattedDeathDate = formatDate(deathDate);

  let latitude, longitude;
  const address = `${city}, ${state}`;
  const geocodingUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  try {
    const response = await axios.get(geocodingUrl);
    console.log("geo location response = ", response.data);
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      latitude = lat;
      longitude = lon;
      console.log("lat = ", lat);
      console.log("lon = ", lon);
      // Store lat and lon in your database
      // Example: profile.medallionProfile.coordinates = { lat, lon };
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }

  const fileExtension = path.extname(req.file.filename);

  // // Generate unique filename using content hashing
  const fileName = `${username}-${Date.now()}-profile-pic${fileExtension}`;

  // // construct path to store the image
  const imagePath = path.join(__dirname, "..", "medallionImages", fileName);
  // const serverURL = "https://lovinglegacy.onrender.com";
  // const imagePath = `${serverURL}/medallionImages/${fileName}`;
  //const imagePath = `../medallionImages/${fileName}`;

  // Compress and save the image using the helper function
  await compressAndSaveImage(profilePicture.data, imagePath);
  const imageUrl = await uploadProfilePicture(imagePath);
  console.log("firebase image url = ", imageUrl);

  let cloudinaryImageUrl;
  // cloudinary async func
  // (async function run() {
  //   console.log("In cloudinary");
  //   const result = await cloudinary.uploader.upload(profilePicture);
  //   cloudinaryImageUrl = result.url;
  //   console.log("cloudinary image url = ", cloudinaryImageUrl);
  //   console.log("cloudinary result = ", result);
  // });

  // cloudinary.uploader.upload(imagePath).then((result) => {
  //   console.log("cloudinary result = ", result);
  // });

  // console.log("image path = ", imagePath);

  console.log("username ", username);
  console.log("bio ", bio);
  console.log("first name = ", firstName);
  console.log("last name = ", lastName);
  console.log("profile picture = ", profilePicture);
  //console.log("req.file = ", req);
  try {
    // Find the profile by username
    const profile = await Profile.findOne({ username });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // Add the medallionData to the profile's medallionProfile field
    profile.medallionProfile = {
      firstName,
      middleName,
      lastName,
      bioInfo: bio,
      profilePicture: imageUrl, // Assign the profilePicture object
      textOrPhrase: headlineText,
      linkToObituary,
      birthDate: formattedBirthDate,
      deathDate: formattedDeathDate,
      city,
      state,
      coordinates: [latitude, longitude],
      quoteSection,
    };
    await profile.save();
    res.status(201).json({ message: "Medallion profile created successfully" });
  } catch (error) {
    console.error("Error storing medallion profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// const getUserNameFromQRCodeId = async (qrCodeId) => {
//   try {
//     const username
//   } catch (error) {
//     console.error("Erroing retrieving username from QR code ID: ", error);
//     throw error;
//   }
// }

module.exports = {
  createProfile,
  getProfileByUsername,
  createMedallionProfile,
  getProfileByQrId,
  compressAndSaveImage,
  // getUserNameFromQRCodeId,
};
