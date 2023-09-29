import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";

import usersRouter from "./routes/users/users.router";
import mealsRouter from "./routes/meals/meals.router";
import ordersRouter from "./routes/orders/orders.router";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
  })
);
app.use(cors());
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
app.use("/meal", mealsRouter);
app.use("/order", ordersRouter);

export default app;
