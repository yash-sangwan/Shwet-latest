require("dotenv").config();
const jwt = require("jsonwebtoken");
const csrf = require("csurf");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sendVerificationEmail = require("./emailVarificationMail");
const csrfProtection = csrf({ cookie: true });
const admin = require("./admin");
const emailValidator = require("email-validator");
const Subscription = require("../models/Subscription");
const sendMail = require("../subscriptionMails/sendMail");
const axios = require("axios");

const login = async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  const user = await User.findOne({
    $or: [{ email: id }, { username: id}],
  });

  if (user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
      } else if (isMatch) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        }); // Token expires in 5 minutes

        // Set the JWT in an HTTP-only cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1 * 60 * 60 * 1000,
        });

        // Generate CSRF token
        csrfProtection(req, res, () => {
          const csrfToken = req.csrfToken();
          res.cookie("XSRF-TOKEN", csrfToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 60 * 60 * 1000,
          });

          res.status(200).json({ message: "Logged in successfully" });
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    if (!username || !email || !password || password.length <= 6) {
      return res.status(400).json({
        message:
          "Bad Request: Missing details or password length should be greater than 6.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already in use." });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
      } else {
        const newUser = new User({
          username: username,
          email: email,
          password: hash,
        });
        const result = await newUser.save();
        if (!result) {
          res.status(400).json({ message: "Registration failed." });
        }
        await sendVerificationEmail(newUser, req, res);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await admin.auth().verifyIdToken(token); // Verify the Firebase token
    const { uid, email, name, photoURL } = ticket;

    // Find or create the user in your MongoDB database
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create a new user
      const hashedPassword = await bcrypt.hash(uid, saltRounds);
      user = new User({
        username: name,
        email: email,
        password: hashedPassword,
        isVerified: true,
      });
      await user.save();
    }

    // Create and send JWT token
    const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000,
    });

    // Generate CSRF token
    csrfProtection(req, res, () => {
      const csrfToken = req.csrfToken();
      res.cookie("XSRF-TOKEN", csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 60 * 60 * 1000,
      });
      res.json({ message: "Logged in successfully" });
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

const githubLogin = async (req, res) => {
  const { token } = req.body;

  try {
    console.log(token);
    const ticket = await admin.auth().verifyIdToken(token);

    const { uid, email, name, photoURL } = ticket;

    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(uid, saltRounds);
      user = new User({
        username: name || email.split("@")[0],
        email,
        password: hashedPassword,
        isVerified: true,
      });
      await user.save();
    }

    const jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000,
    });

    csrfProtection(req, res, () => {
      const csrfToken = req.csrfToken();
      res.cookie("XSRF-TOKEN", csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 60 * 60 * 1000,
      });
      return res.json({ message: "Logged in successfully", csrfToken });
    });
  } catch (error) {
    console.error("Error verifying GitHub token:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("XSRF-TOKEN");
  res.clearCookie("_csrf");
  res.json({ message: "Logged out successfully" });
};

const emailVerification = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Activate user account
    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { isVerified: true } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now log in." });
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(400).json({
      message: "Invalid or expired token. Please re-verify your email id.",
    });
  }
};

const subscribe = async (email) => {
  try {
    const exists = await Subscription.findOne({ email });
    if (!exists) {
      let newSubscription = new Subscription({
        email: email,
      });
      await newSubscription.save();
      const result = await sendMail(email);
      return result;
    }
    return false;
  } catch (error) {
    console.log("Error sending the mail.");
    return false;
  }
};

async function resolveMx(email) {
  try {
    const apiKey = process.env.EMAIL_VALIDATION_API; // Get your API key from Brevo dashboard
    const url = `https://api.emailvalidation.io/v1/info`;

    try {
      const response = await axios.get(url, {
        params: {
          email: email, // Pass the email as query parameter
        },
        headers: {
          apikey: apiKey,
          "Content-Type": "application/json",
        },
      });
      // Handle the response from Brevo API
      if (response.data) {
        if(
          response.data &&
          (response.data.state === "undeliverable" ||
            response.data.state === "unknown")
        ){
          return false;
        }
      }else{
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error validating email with Brevo:", error.message);
    }
  } catch (error) {
    console.log("Error validating email.");
  }
}

async function isValidEmail(email) {
  if (!emailValidator.validate(email)) {
    return false;
  }
  try {
    return await resolveMx(email);
  } catch (error) {
    console.error("DNS resolution error:", error);
    return false;
  }
}

const subscriptionEmail = async (req, res) => {
  try {
    const isValid = await isValidEmail(req.body.email);
    if (isValid) {
      const isSubscribed = await subscribe(req.body.email);
      if (isSubscribed) {
        res.status(200).json({ message: "😃 Subscribed." });
      } else {
        res.status(200).json({ message: "🧐 You are already subscribed." });
      }
    } else {
      res.status(400).json({ message: "😕 Invalid email." });
    }
  } catch (error) {
    res.status(500).json({ message: `Server error. ${error.message}` });
  }
};

const exists = async (req , res) => {
  try {
    const email = req.body.email; 
    const result = await User.findOne({email});
    res.status(200).json({exists : result !== null });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `Server error. ${error.message}` });
  }
}

module.exports = {
  login,
  logout,
  registerUser,
  googleLogin,
  githubLogin,
  emailVerification,
  subscriptionEmail,
  exists,
};
