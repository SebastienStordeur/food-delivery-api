import express from "express";
import { rateLimiter } from "../../middlewares/rateLimiter";

const ordersRouter = express.Router();

/* ordersRouter.post("/", rateLimiter, ""); */

export default ordersRouter;
