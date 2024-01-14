import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import { Book } from "./models/bookModel";
import booksRoute from "./routes/BookStoreProject/booksRoute";
import foodAppRoute from "./routes/FoodOrderingApp/foodAppRoutes";
import personalPageRoute from "./routes/PersonalPage/contactRoute";
import mongoose from "mongoose";
config();

const app: Express = express();
app.use(express.json());

app.use(cors());

const port: string | number = process.env.PORT || 5555;
const mangoURL: string = process.env.MANGO as string;

app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .send(`Hello World! Server is running on port: ${port}`);
});

app.use("/books", booksRoute);
app.use("/food", foodAppRoute);
app.use("/personal-page", personalPageRoute);
mongoose
  .connect(mangoURL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err: any) => {
    console.error(err);
  });
