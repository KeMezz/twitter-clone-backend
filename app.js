import express from "express";
import cors from "cors";
import tweetRouter from "./routers/tweet.js";
import tweetsRouter from "./routers/tweets.js";

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// routers
app.use("/tweets", tweetsRouter);
app.use("/tweet", tweetRouter);

app.listen(8080);
