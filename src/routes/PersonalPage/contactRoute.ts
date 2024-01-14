import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

interface MailData {
  name: string;
  email: string;
  message: string;
}

router.post("/contact", (req: Request, res: Response) => {
  const data: MailData = req.body;

  if (!data.name || !data.email || !data.message) {
    return res.json({ msg: "Please fill out all fields" });
  }

  const smtpTransporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "boulom.vatthana.pro@gmail.com",
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  const mailOptions = {
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
    if (error) {
      return res.status(500).json({
        msg: "Something went wrong on our end. Please try again later.",
      });
    } else {
      return res.json({ msg: "Thank you for contacting Vatthana" });
    }
  });
});

export default router;
