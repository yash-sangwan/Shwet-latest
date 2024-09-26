require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Create a transport with SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send verification email
const sendVerificationEmail = async (user, req, res) => {
  try {
    // Create a JWT token with the user's email
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Construct verification URL
    const verificationUrl = `${process.env.CLIENT_URL}/api/auth/verify-email?token=${token}`;

    // Send verification email
    const mailOptions = {
      from: "hello@shwet.xyz",
      to: user.email,
      subject: 'Verify your email',
      html: `<h4>Verify Your Email</h4>
             <p>Please click the link below to verify your email address:</p>
             <a href="${verificationUrl}">Verify Email</a>
             <p>This link expires in 1 hour.</p>`
    };

    const result = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
  } catch (err) {
    console.error('Error sending verification email:', err.message);
    res.status(500).json({ error: 'Could not send verification email.' });
  }
};

module.exports = sendVerificationEmail;