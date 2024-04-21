const mongoose = require("mongoose");

// Define the Ingredient Schema
const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  { _id: false }
); // _id is set to false because ingredients are embedded documents

// Define the Step Schema
const stepSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
); // _id is set to false because steps are embedded documents

// Define the Recipe Schema
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [ingredientSchema],
    steps: [stepSchema],
    measurementType: {
      type: String,
      enum: ["kg", "portion"],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    tags: [String],
    images: [String],
    author: String,
  },
  {
    timestamps: true, // Mongoose automatically manages createdAt and updatedAt properties
  }
);

// Create the Model from the Schema
export const Recipe = mongoose.model("Recipe", recipeSchema);
