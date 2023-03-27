import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetRouter from "./routers/tweet.js";
import "express-async-errors";
import authRouter from "./routers/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./db/database.js";

const app = express();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// routers
app.use("/tweet", tweetRouter);
app.use("/auth", authRouter);

// error handlers
app.use((_, res) => {
  res.sendStatus(404);
});
app.use((error, _, res) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then((db) => {
    console.log("mongodb init!", db);
    const server = app.listen(config.host.port);
    initSocket(server);
  })
  .catch(console.error);
