import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import csrf from "csurf";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import axios from "axios";
import emailValidator from "email-validator";
import admin from "../Firebase/Admin";
import sendMail from "../Emails/SubscriptionMail";
import { CookieOptions } from 'csurf';
import User from "../Models/User";
import Subscription from "../Models/Subscription";

dotenv.config();

const saltRounds = 10;

const cookieParameters: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
};

const csrfProtection = csrf({cookie: cookieParameters as CookieOptions});

export const login = async (req: Request, res: Response): Promise<void> => {
  const { id, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: id }],
  });

  if (user) {
    bcrypt.compare(
      password,
      user.password,
      (err: Error | undefined, isMatch: Boolean) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else if (isMatch) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "2h",
            }
          );

          res.cookie("token", token, cookieParameters as CookieOptions);

          csrfProtection(req, res, () => {
            const csrfToken = req.csrfToken();
            res.cookie("XSRF-TOKEN", csrfToken, cookieParameters as CookieOptions);

            res
              .status(200)
              .json({ message: "Logged in successfully" , XSRF : csrfToken});
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      }
    );
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password || password.length <= 6) {
      res.status(400).json({
        message:
          "Bad Request: Missing details or password length should be greater than 6.",
      });
      return;
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      res.status(400).json({ message: "Username or email already in use." });
      return;
    }

    bcrypt.hash(
      password,
      saltRounds,
      async (err: Error | undefined, hash: String) => {
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
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.body;

  try {
    const ticket = await admin.auth().verifyIdToken(token);

    const { uid } = ticket;
    const email = ticket.email || `${uid}@github.com`;
    const name = ticket.name;

    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(uid, saltRounds);
      user = new User({
        username: name || email.split("@")[0],
        email: email,
        password: hashedPassword,
        isVerified: true,
      });
      user = await user.save();
    }

    const jwtToken = jwt.sign(
      { email: user.email , role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    );

    res.cookie("token", jwtToken, cookieParameters as CookieOptions);

    csrfProtection(req, res, () => {
      const csrfToken = req.csrfToken();
      res.cookie("XSRF-TOKEN", csrfToken, cookieParameters as CookieOptions);

      res.status(200).json({ message: "Logged in successfully" , XSRF : csrfToken });
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const githubLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.body;

  try {
    console.log(token);
    const ticket = await admin.auth().verifyIdToken(token);

    const { uid } = ticket;
    const email = ticket.email || `${uid}@github.com`;
    const name = ticket.name;

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

    const jwtToken = jwt.sign(
      { email: user.email , role: user?.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    );

    res.cookie("token", jwtToken, cookieParameters as CookieOptions);

    csrfProtection(req, res, () => {
      const csrfToken = req.csrfToken();
      res.cookie("XSRF-TOKEN", csrfToken, cookieParameters as CookieOptions);

      res.status(200).json({ message: "Logged in successfully" , XSRF : csrfToken });
    });
  } catch (error) {
    console.error("Error verifying GitHub token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const logout = (req: Request, res: Response): void => {

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not log out.');
    }
    res.clearCookie("token", cookieParameters as CookieOptions);
  
    res.clearCookie("XSRF-TOKEN", cookieParameters as CookieOptions);
  
    res.clearCookie("CSRF-TOKEN", { path: "/" });
  
    res.clearCookie("_csrf", cookieParameters as CookieOptions);
  
    console.log(res.getHeaders()['set-cookie']);
    console.log(req.sessionID);

    res.setHeader('Set-Cookie', 'session=; Path=/; HttpOnly; Max-Age=0');

    return res.json('Logged out successfully.');
  });

};

export const emailVerification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.query.token as string;

  if (!token) {
    res.status(400).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_RESCTRICTED as string) as {
      email: string;
    };

    const user = await User.findOneAndUpdate(
      { email: decoded.email },
      { $set: { isVerified: true } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now log in." });
  } catch (err) {
    console.error("Token verification error:", (err as Error).message);
    res.status(400).json({
      message: "Invalid or expired token. Please re-verify your email id.",
    });
  }
};

const subscribe = async (email: string): Promise<boolean> => {
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

async function resolveMx(email: string): Promise<boolean> {
  try {
    const apiKey = process.env.EMAIL_VALIDATION_API;
    const url = `https://api.emailvalidation.io/v1/info`;

    try {
      const response = await axios.get(url, {
        params: {
          email: email,
        },
        headers: {
          apikey: apiKey,
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        if (
          response.data &&
          (response.data.state === "undeliverable" ||
            response.data.state === "unknown")
        ) {
          return false;
        }
      } else {
        return false;
      }
      return true;
    } catch (error) {
      console.error(
        "Error validating email with Brevo:",
        (error as Error).message
      );
    }
  } catch (error) {
    console.log("Error validating email.");
  }
  return false;
}

async function isValidEmail(email: string): Promise<boolean> {
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

export const subscriptionEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res
      .status(500)
      .json({ message: `Server error. ${(error as Error).message}` });
  }
};

export const exists = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.body.email;
    const result = await User.findOne({ email });
    res.status(200).json({ exists: result !== null });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Server error. ${(error as Error).message}` });
  }
};
