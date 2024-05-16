const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const authMiddleware = require('../middleware/authToken');
const Event = require('../Models/eventModel'); 

router.post('/send-email', authMiddleware, async (req, res) => {
  const { email, eventId } = req.body;

  try {
    // Fetch event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Thank you for Booking Event',
      text: `We really appreciate your booking on our platform.
             Please enjoy your show. Here are the details of the event:
      Title: ${event.title}
      Description: ${event.description}
      Date: ${event.date}
      Time: ${event.time}
      Location: ${event.location}
      Thank you.`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

module.exports = router;
