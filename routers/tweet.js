import express from "express";
import { tweets } from "../stores/tweets.js";

const tweetRouter = express.Router();

tweetRouter.post("/", (req, res) => {
  console.log(req.body);
  const username = req.body?.username;
  const text = req.body?.text;
  const newTweet = {
    id: Date.now(),
    username,
    text,
    createdAt: new Date().toISOString(),
  };
  if (!username || !text) {
    return res.sendStatus(400);
  } else {
    tweets.push(newTweet);
    return res.status(201).send(tweets);
  }
});

export default tweetRouter;
