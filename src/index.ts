import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import { Book } from "./models/bookModel";
import booksRoute from "./routes/BookStoreProject/booksRoute";
import foodAppRoute from "./routes/FoodOrderingApp/foodAppRoutes";
import mailRoute from "./routes/mailHandlingPersonalPage/email";
import mongoose from "mongoose";
import bodyParser from "body-parser";
config();

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use("/email", mailRoute);
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

export default app;
