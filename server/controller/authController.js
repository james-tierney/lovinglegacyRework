const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user with provided username
    const user = await Profile.findOne({ username });

    // If user doesn't exist or password is incorrect, return 401 Unauthorised
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("JWT token generated after login ", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // http localhost development right now CHANGE
      sameSite: "strict",
    });

    console.log("req.cookie ", req.cookie);

    // If auth is successful, return a success message or user data
    // TODO Can also generate and return a JWT Token here for auth purposes
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
