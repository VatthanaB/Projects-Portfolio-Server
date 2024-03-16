import express from "express";
const router = express.Router();
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

router.post("/contact", (req, res) => {
  let data = req.body;
  if (
    data.name.length === 0 ||
    data.email.length === 0 ||
    data.message.length === 0
  ) {
    return res.json({ msg: "Please fill out all fields" });
  }

  let smtpTransporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "boulom.vatthana.pro@gmail.com",
      pass: process.env.PASSWORD,
    },
  });
  let mailOptions = {
    from: data.email,
    to: "boulom.vatthana.pro@gmail.com",
    subject: `Message from ${data.name}`,
    html: `
    <h3>Information</h3>
    <ul>
    <li>Name: ${data.name}</li>
    <li>Email: ${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
    `,
  };
  smtpTransporter.sendMail(mailOptions, (error, response) => {
    try {
      if (error)
        return res.status(500).json({
          msg: "Something went wrong on our end. Please try again later.",
        });
      else return res.json({ msg: "Thank you for contacting Vatthana" });
    } catch (error) {
      if (error)
        return res.status(500).json({
          msg: "Something went wrong on our end. Please try again later.",
        });
    }
  });
});

export default router;
