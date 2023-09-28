import { Request, Response } from "express";
import { Meal } from "../../models/meal/meal.mongo";

export async function getMeals(req: Request, res: Response) {
  try {
    const meals = await Meal.find({}).lean();
    return res.status(200).json({ success: true, data: meals });
  } catch (error) {
    console.log("Error fetching meals: ", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getMeal(req: Request, res: Response) {
  try {
    const meal = await Meal.findOne({ _id: "" });
    return res.status(200).json({ success: true, data: meal });
  } catch (error) {
    console.log("Error fetching meal: ", error);
    return res.status(500).json({ success: false, message: "Internal server error", error });
  }
}
