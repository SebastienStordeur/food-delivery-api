import express from "express";
import { createUser, login } from "./users.controller";
import { rateLimiter } from "../../middlewares/rateLimiter";

const usersRouter = express.Router();

usersRouter.post("/signup", createUser);
usersRouter.post("/login", rateLimiter, login);

export default usersRouter;
