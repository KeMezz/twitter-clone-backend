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
    tweets.splice(0, 0, newTweet);
    return res.status(201).send(tweets);
  }
});

tweetRouter.put("/", (req, res) => {
  const id = req.body?.id?.toString();
  const text = req.body?.text;
  const targetIndex = tweets.findIndex((tweet) => tweet.id.toString() === id);

  if (!id || !text) {
    return res
      .status(400)
      .send(
        "can't find tweet id or new tweet text in your request (need both)"
      );
  } else if (targetIndex < 0) {
    return res.status(404).send("Requested tweet id is not exists");
  } else {
    const newTweet = {
      ...tweets.find((tweet) => tweet.id.toString() === id),
      text,
    };
    tweets.splice(targetIndex, 1, newTweet);
    return res.status(201).send(tweets);
  }
});

tweetRouter.delete("/", (req, res) => {
  const id = req.body?.id?.toString();
  const targetIndex = tweets.findIndex((tweet) => tweet.id.toString() === id);

  if (!id) {
    return res.status(400).send("can't find tweet id in your request");
  } else if (targetIndex < 0) {
    return res.status(404).send("Requested tweet id is not exists");
  } else {
    tweets.splice(targetIndex, 1);
    return res.status(204).send(tweets);
  }
});

export default tweetRouter;
