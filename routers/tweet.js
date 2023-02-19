import express from "express";
import { tweets } from "../stores/tweets.js";

const tweetRouter = express.Router();

tweetRouter.get("/", (req, res) => {
  const username = req.query?.username;
  if (username) {
    res.status(200).send(tweets.filter((tweet) => tweet.username === username));
  } else {
    res.status(200).send(tweets);
  }
});

tweetRouter.post("/", (req, res) => {
  const username = req.body?.username;
  const text = req.body?.text;

  if (!username || !text) {
    return res
      .status(404)
      .send("Can't find username or text in your request (need both)");
  } else {
    const newTweet = {
      id: Date.now(),
      username,
      text,
      createdAt: new Date().toISOString(),
    };
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
      .send("Can't find tweet id or text in your request (need both)");
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
    return res.status(400).send("Can't find tweet id in your request");
  } else if (targetIndex < 0) {
    return res.status(404).send("Requested tweet id is not exists");
  } else {
    tweets.splice(targetIndex, 1);
    return res.status(204).send(tweets);
  }
});

export default tweetRouter;
