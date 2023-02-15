import express from "express";
import tweetRouter from "./routers/tweet.js";
import tweetsRouter from "./routers/tweets.js";

const app = express();

// middlewares
app.use(express.json());

// routers
app.use("/tweets", tweetsRouter);
app.use("/tweet", tweetRouter);

app.listen(8080);
