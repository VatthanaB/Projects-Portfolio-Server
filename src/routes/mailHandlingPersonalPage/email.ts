import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Email route is working");
});

router.post("/contact", (req: Request, res: Response) => {
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
