// profileController.js
const Profile = require("../models/Profile");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const path = require("path");
const { profile } = require("console");
const { file } = require("pdfkit");

require("dotenv").config();
// const multer = require("multer");

// // Set up multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Destination directory for uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.profilePicture); // Use the original file name
//   },
// });

// // Create multer instance with storage configuration
// const upload = multer({ storage: storage });

// const createProfile = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if the username already exists
//     const existingProfile = await Profile.findOne({ username });

//     if (existingProfile) {
//       // Username already taken, send a response with a 409 status code (Conflict)
//       return res.status(409).json({ error: "Username already taken" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ username, email }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Create a new profile
//     const newProfile = new Profile({
//       profileId: uuidv4(), // Generating a unique ID using uuid
//       username,
//       email,
//       password,
//       token,
//     });

//     console.log("new profile created ", JSON.stringify(newProfile));
//     // Save the profile to the database
//     const savedProfile = await newProfile.save();

//     // // Generate JWT token
//     // const token = jwt.sign({ username, email }, process.env.JWT_SECRET, {
//     //   expiresIn: "1h",
//     // });
//     console.log("token ", token);
//     // Send the token to the client via a cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, // http localhost development right now CHANGE
//       sameSite: "strict",
//     });

//     res.status(201).json({ profile: savedProfile, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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
      // Add other profile properties if needed
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
      .resize({ width: 800 })
      .jpeg({ quality: 80 })
      .toFile(imagePath);
    console.log("image compressed and saved successfully ", imagePath);
  } catch (error) {
    console.error("Error compressing and saving image:", error);
    throw error; // Rethrow error to be handled by the caller
  }
};

const createMedallionProfile = async (req, res) => {
  // console.log("req = ", req);
  const medallionData = req.body;
  console.log("medallionData = ", JSON.stringify(medallionData));
  console.log("image file path ", req.file.path);
  console.log("image file ", req.file);
  const profilePicture = {
    data: fs.readFileSync(req.file.path), // Read file from disk and store as Buffer
    contentType: req.file.mimetype, // Access content type of the uploaded file
  };

  const { username, firstName, lastName, email, bio } = req.body; // Access other form fields
  // const profilePicture = req.file; // Access uploaded file (if present)

  // Compress and resize the image using Sharp

  // sharp(profilePicture)
  //   .resize({ width: 800 })
  //   .jpeg({ quality: 80 })
  //   .toFile(imagePath, (err, info) => {
  //     if (err) {
  //       console.error("Error compressing image ", err);
  //     } else {
  //       console.log("Image compressed: ", info);
  //     }
  //   });

  const fileExtension = path.extname(req.file.filename);

  // Generate unique filename using content hashing
  const fileName = `${username}-${Date.now()}-profile-pic${fileExtension}`;

  // construct path to store the image
  const imagePath = path.join(__dirname, "..", "medallionImages", fileName);

  // Compress and save the image using the helper function
  await compressAndSaveImage(profilePicture.data, imagePath);

  console.log("image path = ", imagePath);

  console.log("username ", username);
  console.log("bio ", bio);
  console.log("email ", email);
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
      lastName,
      email,
      bioInfo: bio,
      profilePicture: imagePath, // Assign the profilePicture object
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
  // getUserNameFromQRCodeId,
};
