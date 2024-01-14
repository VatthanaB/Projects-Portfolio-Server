"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const booksRoute_1 = __importDefault(require("./routes/BookStoreProject/booksRoute"));
const foodAppRoutes_1 = __importDefault(require("./routes/FoodOrderingApp/foodAppRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const personalPage_1 = __importDefault(require("./routes/PersonalPage/personalPage"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 5555;
const mangoURL = process.env.MANGO;
app.get("/", (req, res) => {
    return res
        .status(200)
        .send(`Hello World! Server is running on port: ${port}`);
});
app.use("/books", booksRoute_1.default);
app.use("/food", foodAppRoutes_1.default);
app.use("/personal", personalPage_1.default);
mongoose_1.default
    .connect(mangoURL)
    .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})
    .catch((err) => {
    console.error(err);
});
