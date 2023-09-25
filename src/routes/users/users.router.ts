import express from "express";
import { createUser } from "./users.controller";

const usersRouter = express.Router();

usersRouter.post("/signup", createUser);

export default usersRouter;
