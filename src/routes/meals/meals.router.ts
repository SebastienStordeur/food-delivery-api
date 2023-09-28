import express from "express";

import { getMeal, getMeals } from "./meals.controller";

const mealsRouter = express.Router();

mealsRouter.get("/", getMeals);
mealsRouter.get("/:id", getMeal);

export default mealsRouter;
