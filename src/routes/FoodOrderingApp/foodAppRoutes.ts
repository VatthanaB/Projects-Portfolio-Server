import express, { Request, Response } from "express";
import { Food } from "../../models/foodAppModel";
import { Order } from "../../models/foodOrders";

const router = express.Router();

interface FoodBody {
  name: string;
  description: string;
  price: number;
}

router.post(
  "/addFood",
  async (req: Request<{}, {}, FoodBody>, res: Response) => {
    const { name, description, price } = req.body;

    try {
      const newFood = new Food({ name, description, price });
      await newFood.save();

      res.status(201).json(newFood);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({
          message: error.message,
        });
      }
    }
  }
);

router.get("/getFood", async (req: Request, res: Response) => {
  try {
    const food = await Food.find({});
    res.status(200).json(food);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  }
});

interface OrderBody {
  user: string;
  orderedItems: string[];
}

router.post(
  "/orders",
  async (req: Request<{}, {}, OrderBody>, res: Response) => {
    const { user, orderedItems } = req.body;

    try {
      const newOrder = new Order({ user, orderedItems });
      await newOrder.save();

      res.status(201).json(newOrder);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send({
          message: error.message,
        });
      }
    }
  }
);

export default router;
