const Profile = require("../models/Profile");

module.exports.handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user with provided username
    const user = await Profile.findOne({ username });

    // If user doesn't exist or password is incorrect, return 401 Unauthorised
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If auth is successful, return a success message or user data
    // TODO Can also generate and return a JWT Token here for auth purposes
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
