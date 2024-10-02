import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

dotenv.config();

// Create a transport with SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface User {
  email: string;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

// Function to send verification email
const sendVerificationEmail = async (
  user: User,
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Create a JWT token with the user's email
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Construct verification URL
    const verificationUrl = `${process.env.CLIENT_URL}/api/auth/verify-email?token=${token}`;

    // Send verification email
    const mailOptions: MailOptions = {
      from: "hello@shwet.xyz",
      to: user.email,
      subject: "Verify your email",
      html: `<h4>Verify Your Email</h4>
             <p>Please click the link below to verify your email address:</p>
             <a href="${verificationUrl}">Verify Email</a>
             <p>This link expires in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending verification email:", (err as Error).message);
  }
};

export default sendVerificationEmail;
