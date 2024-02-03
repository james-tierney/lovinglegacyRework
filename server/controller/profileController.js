// profileController.js
const Profile = require("../models/Profile");

const createProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;

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

module.exports = {
  createProfile,
};
