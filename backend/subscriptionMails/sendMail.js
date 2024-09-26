require('dotenv').config();
const nodemailer = require('nodemailer');

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
const sendMail = async (email) => {
  try {

    // Send verification email
    const mailOptions = {
      from: "hello@shwet.xyz",
      to: email,
      subject: 'Subscription',
      html: `<h2>Thank you for subsribing to Shwet.</h2>`
    };

    const result = await transporter.sendMail(mailOptions);
    return true
  } catch (err) {
    console.error('Error subscribing:', err.message);
    return false
  }
};

module.exports = sendMail;