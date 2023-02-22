import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetRouter from "./routers/tweet.js";
import "express-async-errors";

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

// error handlers
app.use((_, res) => {
  res.sendStatus(404);
});
app.use((error, _, res) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
