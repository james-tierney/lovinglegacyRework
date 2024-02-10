// profileController.js
const Profile = require("../models/Profile");
const { v4: uuidv4 } = require("uuid");

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
  // getUserNameFromQRCodeId,
};
