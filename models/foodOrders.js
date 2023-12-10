import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
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
export const Order = mongoose.model("food-order", orderSchema);
