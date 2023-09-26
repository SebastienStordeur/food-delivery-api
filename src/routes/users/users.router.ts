import express from "express";
import { createUser, login } from "./users.controller";

const usersRouter = express.Router();

usersRouter.post("/signup", createUser);
usersRouter.post("/login", login);

export default usersRouter;
