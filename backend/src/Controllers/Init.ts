import { Request, Response } from "express";
import User from "../Models/User";
import sendVerificationEmail from "../Emails/VerificationMail";

interface AuthenticatedRequest extends Request {
  email?: string;
  role?: string;
}

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
      res
        .status(200)
        .json({
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

export const isWalletAdded = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const email = req.email;
    const user = await User.findOne({ email });
    if (user?.wallet) {
      res.status(200).json({ status: true, message: "Wallet is added." });
    } else {
      res.status(200).json({ status: false, message: "Wallet is not added." });
    }
  } catch (error) {
    console.error("Error in isWalletAdded:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addWallet = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    // Your logic here
    const email = req.email;
    const user = await User.findOne({ email });
    const wallet = req.body.wallet;
    if (user && !user.wallet && user.role == "WORKER") {
      const updatedUser = await User.findOneAndUpdate(
        { email: email }, // Condition to match the user (by their unique ID in this case)
        { $set: { wallet: wallet } }, // Update (setting `isVerified` to true)
        { new: true }
      );
      res.status(200).json({ status: true, message: "Wallet added." });
    } else {
      res
        .status(200)
        .json({ status: false, message: "Wallet could not be added." });
    }
  } catch (error) {
    console.error("Error in addWallet:", error);
    res.status(500).json({ error: "Internal server error" });
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

    if (!role) {
      res.status(200).json({ status: false, message: "Role not defined" });
    }

    if (user?.isVerified) {
      const updatedUser = await User.findOneAndUpdate(
        { email: email }, // Condition to match the user (by their unique ID in this case)
        { $set: { role: role } }, // Update (setting `isVerified` to true)
        { new: true }
      );
      res.status(200).json({ status: true, message: "Updated role." });
    } else {
      res
        .status(200)
        .json({ status: false, message: "Failed to update role." });
    }
  } catch (error) {
    console.error("Error in addRole:", error);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
};


export const checkUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({email : req.email});
    if(user){
      const data = {
        email : user.email,
        role : user.role
      }
      res.status(200).json({status:true, message: 'User authorized.', user:data});
    }
    else{
      res.status(200).json({status:false, message: 'User un-authorized.'});
    }
  } catch (error) {
    console.error('Error in checkUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
