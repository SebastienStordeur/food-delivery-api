import express from "express";
import cors from "cors";
import helmet from "helmet";
import usersRouter from "./routes/users/users.router";

const app = express();

app.use(express.json());

app.use("/user", usersRouter);

export default app;
