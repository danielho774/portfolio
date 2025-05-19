const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Email sending endpoint
app.post('/api/send-email', upload.single('attachment'), async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
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
      from: process.env.FROM_EMAIL, // sender address
      to: process.env.TO_EMAIL, // recipient address
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Add attachment if file was uploaded
    if (req.file) {
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          path: req.file.path,
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