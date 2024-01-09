"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const foodAppModel_1 = require("../../models/foodAppModel");
const foodOrders_1 = require("../../models/foodOrders");
const router = express_1.default.Router();
router.post("/addFood", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price } = req.body;
    try {
        const newFood = new foodAppModel_1.Food({ name, description, price });
        yield newFood.save();
        res.status(201).json(newFood);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }
}));
router.get("/getFood", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield foodAppModel_1.Food.find({});
        res.status(200).json(food);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }
}));
router.post("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, orderedItems } = req.body;
    try {
        const newOrder = new foodOrders_1.Order({ user, orderedItems });
        yield newOrder.save();
        res.status(201).json(newOrder);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({
                message: error.message,
            });
        }
    }
}));
exports.default = router;
