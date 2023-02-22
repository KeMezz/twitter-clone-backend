import express from "express";
import * as tweetController from "../controller/tweet.js";

const tweetRouter = express.Router();

tweetRouter.get("/", tweetController.getTweets);
tweetRouter.get("/:id", tweetController.getTweet);
tweetRouter.post("/", tweetController.createTweet);
tweetRouter.put("/", tweetController.updateTweet);
tweetRouter.delete("/", tweetController.removeTweet);

export default tweetRouter;
