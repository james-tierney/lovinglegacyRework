// profileController.js
const Profile = require("../models/Profile");

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
  try {
    const { username } = req.params;

    // Retrieve the user profile based on the username
    const userProfile = await Profile.findOne({ username });

    // Logic for user profile not existing
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProfile,
  getProfileByUsername,
};
