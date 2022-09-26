import express from "express";
import "express-async-errors";
import * as tweetRepository from "../data/tweet.js";
import * as tweetController from "../controller/tweet.js";

const tweetsRouter = express.Router();

tweetsRouter.get("/", tweetController.getTweets);
tweetsRouter.get("/:id", tweetController.getTweetById);
tweetsRouter.post("/", tweetController.getTweet);
tweetsRouter.delete("/:id", tweetController.deleteTweet);
tweetsRouter.put("/:id", tweetController.updateTweet);

export default tweetsRouter;
