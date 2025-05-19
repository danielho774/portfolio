const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    
    // Create a nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
      port: process.env.SMTP_PORT, // e.g., 587
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER, // sender address
      to: email, // recipient address
      subject: `Hi ${name}! Thank you for your interest!`,
      text: `
        Hey ${name},

        Thank you for your interest in my work! I hope you enjoyed looking through my website.
        I am currently working on a few projects and will get back to you as soon as possible.
        In the meantime, feel free to look through my resume which is attached to this email.
        In case you want to get in touch, please feel free to reply to this email or reach out to me on any of my social media platforms.

        Best,
        Daniel Ho

        tel: 626-861-1049
        linkedin: https://www.linkedin.com/in/daniel-k-ho/
      `,
      html: `
        <p>Hey ${name},</p>
        <br>
        <p>Thank you for your interest in my work! I hope you enjoyed looking through my website.</p>
        <p>I am currently working on a few projects and will get back to you as soon as possible.</p>
        <p>In the meantime, feel free to look through my resume which is attached to this email.</p>
        <p>In case you want to get in touch, please feel free to reply to this email or reach out to me on any of my social media platforms.</p>
        <br>
        <p>Best,</p>
        <p>Daniel Ho</p>
        <p>tel: 626-861-1049</p>
        <p>linkedin: <a href="https://www.linkedin.com/in/daniel-k-ho/">https://www.linkedin.com/in/daniel-k-ho/</a></p>
      `,
    };

    // Add attachment if file was uploaded
    if (req.file) {
      mailOptions.attachments = [
        {
          filename: "Technical_Resume_DHo.pdf",
          path: "/assets/Technical_Resume_DHo.pdf",
          contentType: "application/pdf",
        },
      ];
    }

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});