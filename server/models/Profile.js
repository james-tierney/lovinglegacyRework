const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: String,
  // Add other profile-related fields as needed
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
