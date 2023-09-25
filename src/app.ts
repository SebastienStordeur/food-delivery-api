import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(express.json());

export default app;
