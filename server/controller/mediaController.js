const compressAndSaveImage = require("../controller/profileController");
const Profile = require("../models/Profile");

const uploadProfileMedia = async (req, res) => {
  try {
    // Extract data from the request body
    const { username, title, description, mediaType, mediaLink } = req.body;

    // Find the profile document associated with the provided username
    const profile = await Profile.findOne({ username });
    console.log("profile in uploading media ", profile);

    // If the profile doesn't exist, return an error
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Push the new media object into the profile's media array
    // Add the new media to the profile
    profile.medallionProfile.media.push({
      title,
      description,
      mediaType,
      mediaLink,
    });
    // Save the updated profile document
    await profile.save();

    console.log("profile media ", profile.medallionProfile.media);

    // Respond with a success message
    res.status(200).json({ message: "Media uploaded successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error uploading profile media:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  uploadProfileMedia,
};
