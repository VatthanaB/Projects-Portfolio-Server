import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/BookStoreProject/booksRoute.js";
import foodAppRoute from "./routes/FoodOrderingApp/foodAppRoutes.js";
import mongoose from "mongoose";
config();

const app = express();
app.use(express.json());

// Option : 1 : Allow all origins with Default Settings of cors
app.use(cors());

//  Option : 2 : Allow all origins with Custom Settings of cors
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
const port = process.env.PORT || 5555;
const mangoURL = process.env.MANGO;

app.get("/", (req, res) => {
  return res
    .status(200)
    .send(`Hello World! Server is running on port: ${port}`);
});

app.use("/books", booksRoute);
app.use("/food", foodAppRoute);
mongoose
  .connect(mangoURL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
