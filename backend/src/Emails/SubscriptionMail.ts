import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

// Create a transport with SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

// Function to send verification email
const sendMail = async (email: string): Promise<boolean> => {
  try {
    // Send verification email
    const mailOptions: MailOptions = {
      from: "hello@shwet.xyz",
      to: email,
      subject: 'Subscription',
      html: `<h2>Thank you for subscribing to Shwet.</h2>`
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error('Error subscribing:', (err as Error).message);
    return false;
  }
};

export default sendMail;