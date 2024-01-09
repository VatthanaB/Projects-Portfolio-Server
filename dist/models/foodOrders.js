"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        name: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        postal: {
            type: Number,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    }, // this is now an object
    orderedItems: [
        {
            amount: {
                type: Number,
                required: true,
            },
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
});
exports.Order = mongoose_1.default.model("food-order", orderSchema);
