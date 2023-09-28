import http from "http";
import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const MONGO_DB_URL = process.env.MONGO_DB_URL! || "";

console.log(MONGO_DB_URL);

const server = http.createServer(app);

mongoose.connection.on("open", (error) => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function startServer() {
  await mongoose.connect(MONGO_DB_URL);

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
