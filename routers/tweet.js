import express from "express";
import * as tweetController from "../controller/tweet.js";
import {
  findErrors,
  validateBodyId,
  validateBodyText,
  validateBodyUsername,
} from "../middleware/validator.js";

const tweetRouter = express.Router();

tweetRouter.get("/", tweetController.getTweets);
tweetRouter.get("/:id", tweetController.getTweet);
tweetRouter.post(
  "/",
  [validateBodyText, validateBodyUsername, findErrors],
  tweetController.createTweet
);
tweetRouter.put(
  "/",
  [validateBodyId, validateBodyText, validateBodyUsername, findErrors],
  tweetController.updateTweet
);
tweetRouter.delete(
  "/",
  [validateBodyId, findErrors],
  tweetController.removeTweet
);

export default tweetRouter;
