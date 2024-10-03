import { Request, Response } from "express";
import User from "../Models/User";
import jwt from "jsonwebtoken";
import csrf from "csurf";
import sendVerificationEmail from "../Emails/VerificationMail";
import WorkerBalance from "../Models/WorkerBalance";

interface AuthenticatedRequest extends Request {
  email?: string;
  role?: string;
}
const csrfProtection = csrf({cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none', 
  }});

export const verification = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.email });
    if (user) {
      const result = await sendVerificationEmail(user, req, res);
      res.status(200).json({ status: true, message: "Email sent." });
    } else {
      res.status(200).json({
        status: false,
        message:
          "Failed to send verification email. Please try again after some time.",
      });
    }
  } catch (error) {
    console.error("Error in verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const isVerified = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.email;
    const user = await User.findOne({ email });

    if (user?.isVerified) {
      res.status(200).json({ status: true, message: "User verified." });
    } else {
      res.status(200).json({ status: false, message: "User not verified." });
    }
  } catch (error) {
    console.error("Error in isVerified:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const isRoleDefined = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.email;
    const user = await User.findOne({ email });

    if (user?.role) {
      res.status(200).json({ status: true, message: "Role defined." });
    } else {
      res.status(200).json({ status: false, message: "Role is not defined." });
    }
  } catch (error) {
    console.error("Error in isRoleDefined:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getRole = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.email;
    const user = await User.findOne({ email });

    if (user?.role) {
      res
        .status(200)
        .json({ status: true, message: "Role defined.", userRole: user.role });
    } else {
      res.status(200).json({ status: false, message: "Role is not defined." });
    }
  } catch (error) {
    console.error("Error in isRoleDefined:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getMail = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.email;
    const user = await User.findOne({ email });

    if (user?.email) {
      res
        .status(200)
        .json({ status: true, message: "Role defined.", userMail: user.email });
    } else {
      res.status(200).json({ status: false, message: "Role is not defined." });
    }
  } catch (error) {
    console.error("Error in isRoleDefined:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const addRole = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.email;
    const type = req.body.role;

    let role = "";

    if (type === "1") {
      role = "PROVIDER";
    } else if (type === "2") {
      role = "WORKER";
    }

    const user = await User.findOne({ email });
    if(user?.role){
      
      res.status(200).json({ status: false, message: "Role defined" });
      return ;
    }

    if (!role) {
      res.status(200).json({ status: false, message: "Role not defined" });
      return ;
    }

    if (user?.isVerified) {
      const updatedUser = await User.findOneAndUpdate(
        { email: email }, // Condition to match the user (by their unique ID in this case)
        { $set: { role: role } }, // Update (setting `isVerified` to true)
        { new: true }
      );
      if(role === "WORKER"){
        const newWorkerBalance = new WorkerBalance({
          workerId: user._id,
        });
        await newWorkerBalance.save();
      }

      const jwtToken = jwt.sign(
        { email: user.email , role: role },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );
  
      res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 2 * 60 * 60 * 1000,
      });
  
      csrfProtection(req, res, () => {
        const csrfToken = req.csrfToken();
        res.cookie("XSRF-TOKEN", csrfToken, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
          maxAge: 2 * 60 * 60 * 1000,
        });
      })

      res.status(200).json({ status: true, message: "Updated role." });
    } else {
      res.status(200).json({ status: false, message: "Failed to update role." });
    }
  } catch (error) {
    console.error("Error in addRole:", error);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
};

export const checkUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.email });
    if (user) {
      const data = {
        email: user.email,
        role: user.role,
      };
      res
        .status(200)
        .json({ status: true, message: "User authorized.", user: data });
    } else {
      res.status(200).json({ status: false, message: "User un-authorized." });
    }
  } catch (error) {
    console.error("Error in checkUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
