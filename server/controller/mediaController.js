const { compressAndSaveImage } = require("../controller/profileController");
const { uploadProfilePicture } = require("../controller/profileController");
const Profile = require("../models/Profile");
const path = require("path");

const uploadProfileMedia = async (req, res) => {
  try {
    // Extract data from the request body
    const { username, title, description, mediaType, mediaLink, mediaFile } =
      req.body;
    console.log("req file from media = ", req.body);
    console.log("media file = ", mediaFile);
    console.log("username = ", username);
    const fileName = `${username}-${Date.now()}-image${mediaLink}`;
    const imagePath = path.join(__dirname, "..", "medallionImages", fileName); // Use the generated fileName instead of mediaLink
    const compressedImagePath = await compressAndSaveImage(
      mediaFile.data,
      imagePath
    ); // Call compressAndSaveImage function
    const imageUrl = await uploadProfilePicture(compressedImagePath); // Upload the compressed image to Firebase

    // Find the profile document associated with the provided username
    const profile = await Profile.findOne({ username });

    // If the profile doesn't exist, return an error
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Push the new media object into the profile's media array
    profile.medallionProfile.media.push({
      title,
      description,
      mediaType,
      mediaLink: imageUrl, // Use the Firebase URL instead of the local file path
    });

    // Save the updated profile document
    await profile.save();

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
