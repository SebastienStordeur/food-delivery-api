import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your meal needs a name"],
  },
  ingredients: {
    type: [
      {
        name: { type: String },
        quantity: { type: Number },
        unit: { type: String },
      },
    ],
    default: [],
    required: true,
  },
  images: {
    type: Array,
    default: [],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const Meal = mongoose.model("Meal", mealSchema);
