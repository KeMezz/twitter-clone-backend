import express from "express";
import { tweets } from "../stores/tweets";

const tweetsRouter = express.Router();

tweetsRouter.get("/", (req, res) => {
  const username = req.query?.username;
  if (username) {
    res.status(200).send(tweets.filter((tweet) => tweet.username === username));
  } else {
    res.status(200).send(tweets);
  }
});

export default tweetsRouter;
