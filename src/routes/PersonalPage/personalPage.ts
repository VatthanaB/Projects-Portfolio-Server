import express, { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();

router.use(bodyParser.json());
router.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "boulom.vatthana.pro@gmail.com",
    pass: process.env.PASSWORD_GMAIL, // Replace with your Gmail app password
  },
});

router.get("/", (req: Request, res: Response) => {
  return res.status(200).send("This is the personal page route.");
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }

    const mailOptions = {
      from: "your.gmail@gmail.com",
      to: "boulom.vatthana.pro@gmail.com", // Replace with your recipient's email
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default router;
