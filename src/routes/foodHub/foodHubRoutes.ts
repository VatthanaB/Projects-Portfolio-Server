import express, { Request, Response } from "express";
import { Recipe } from "../../models/recipesModel";

const router = express.Router();

router.get("/greeting", async (req: Request, res: Response) => {
  try {
    res.send("hello world!");
  } catch (e) {
    res.status;
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find({});
    res.send(recipes);
  } catch (e) {
    res.status(500).send(e);
  }
});

// POST method to add a new recipe
router.post("/", async (req: Request, res: Response) => {
  try {
    // Create a new recipe document using the data from the request body
    const newRecipe = await Recipe.create(req.body);

    // Respond with the newly created recipe and a 201 status code for successful creation
    res.status(201).send(newRecipe);
  } catch (e) {
    // If there's an error, send back a 400 status code and the error message
    res.status(400).send(e);
  }
});

export default router;
