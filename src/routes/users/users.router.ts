import express from "express";
import { createUser, login } from "./users.controller";
import { rateLimiter } from "../../middlewares/rateLimiter";
import { validateUserRegistration } from "../../middlewares/validation/userRegistration";

const usersRouter = express.Router();

usersRouter.post("/signup", rateLimiter, validateUserRegistration, createUser);
usersRouter.post("/login", rateLimiter, login);

export default usersRouter;
