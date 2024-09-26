const User = require("../models/User");
const jwt = require("jsonwebtoken");

const isVerified = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    
    const user = await User.findOne({ email });
    if (user) {
      if (user.isVerified) {
        return res.status(200).json({ message: "User verified." });
      } else {
        return res.status(205).json({ message: "User not verified." });
      }
    }
    return res.status(400).json({ message: "User not found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(200).json({
          username: user.username,
          email: user.email,
          verified: user.isVerified,
        });
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    }
    return res.status(400).json({ message: "Wrong email id." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

const checkUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(200).json({ message: "Authorized" });
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    }
    return res.status(400).json({ message: "Wrong email id." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  isVerified,
  getUserDetails,
  checkUser,
};
