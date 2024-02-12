// profileController.js
const Profile = require("../models/Profile");
const { v4: uuidv4 } = require("uuid");
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

const createProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const existingProfile = await Profile.findOne({ username });

    if (existingProfile) {
      // Username already taken, send a response with a 409 status code (Conflict)
      return res.status(409).json({ error: "Username already taken" });
    }

    // Create a new profile
    const newProfile = new Profile({
      profileId: uuidv4(), // Generating a unique ID using uuid
      username,
      email,
      password,
    });

    console.log("new profile created ", JSON.stringify(newProfile));
    // Save the profile to the database
    const savedProfile = await newProfile.save();

    res.status(201).json(savedProfile);
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

const createMedallionProfile = async (req, res) => {
  // console.log("req = ", req);
  const medallionData = req.body;
  console.log("medallionData = ", JSON.stringify(medallionData));

  const { username, firstName, lastName, email, bio } = req.body; // Access other form fields
  const profilePicture = req.file; // Access uploaded file (if present)
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
    profile.medallionProfile = medallionData;
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
  // getUserNameFromQRCodeId,
};
