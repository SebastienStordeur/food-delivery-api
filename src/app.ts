import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";

import usersRouter from "./routes/users/users.router";

const app = express();

app.use(express.json());
app.use(
  session({
    secret: "TO BE REPLACED LATER",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2629746000, //one month
      httpOnly: true,
      secure: true,
    },
  })
);

app.use("/user", usersRouter);

export default app;
