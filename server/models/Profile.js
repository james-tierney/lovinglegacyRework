const mongoose = require("mongoose");
const crypto = require("crypto");

const profileSchema = new mongoose.Schema({
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

  salt: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

// Virtual Field for handling plain text password during user registration
profileSchema.virtual("password").set(function (password) {
  // Generate a unqiue salt for each user
  this.salt = crypto.randomBytes(16).toString("hex");
  // Hash the password with the salt
  this.hashedPassword = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("hex");
});

// Method to validate a password during login
profileSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
    .toString("hex");
  return this.hashedPassword === hash;
};

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
