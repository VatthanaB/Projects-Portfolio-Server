import express from "express";
import { Food } from "../../models/foodAppModel.js";
import { Order } from "../../models/foodOrders.js";

const router = express.Router();

router.post("/addFood", async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newFood = new Food({ name, description, price });
    await newFood.save();

    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getFood", async (req, res) => {
  try {
    const food = await Food.find({});
    res.status(200).json(food);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/orders", async (req, res) => {
  const { user, orderedItems } = req.body;

  try {
    const newOrder = new Order({ user, orderedItems });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
