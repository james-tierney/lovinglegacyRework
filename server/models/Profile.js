const mongoose = require("mongoose");
const crypto = require("crypto");

const medallionProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
  },
  middleName: {
    type: String,
    required: false,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: false,
    unique: false,
  },
  relationship: {
    type: String,
    required: false,
    unique: false,
  },
  profilePicture: {
    data: Buffer, // Use Buffer type to store binary data (image)
    contentType: String, // Store content type of the image
  },
  textOrPhrase: {
    type: String,
    required: false,
    unqiue: false,
  },
  linkToObituary: {
    type: String,
    required: false,
    unique: false,
  },
  BioInfo: {
    type: String,
    required: false,
    unique: false,
  },
  birthDate: {
    type: Date, // Use Date type to store dates
    required: false,
    unique: false,
  },
  deathDate: {
    type: Date, // Use Date type to store dates
    required: false,
    unique: false,
  },
  city: {
    type: String,
    required: false,
    unique: false,
  },
  state: {
    type: String,
    required: false,
    unique: false,
  },
  textOrPhrase: {
    type: String,
    required: false,
    unique: false,
  },
});

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
  medallionProfile: medallionProfileSchema, // Embed MedallionProfile schema

  salt: {
    type: String,
    required: false,
  },
  hashedPassword: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    required: false,
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
