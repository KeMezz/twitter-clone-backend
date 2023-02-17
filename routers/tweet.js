import express from "express";
import { tweets } from "../stores/tweets.js";

const tweetRouter = express.Router();

tweetRouter.post("/", (req, res) => {
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

tweetRouter.delete("/", (req, res) => {
  const id = req.body?.id.toString();
  const targetIndex = tweets.findIndex((tweet) => tweet.id.toString() === id);
  if (!id) {
    return res.sendStatus(400);
  } else if (targetIndex < 0) {
    return res.status(404).send("Tweet not found");
  } else {
    tweets.splice(targetIndex, 1);
    // const newTweets = tweets.filter((tweet) => tweet.id.toString() !== id);
    return res.status(200).send(tweets);
  }
});

export default tweetRouter;
