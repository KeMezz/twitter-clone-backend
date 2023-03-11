import express from "express";
import * as tweetController from "../controller/tweet.js";
import { isAuth } from "../middleware/auth.js";
import {
  findErrors,
  validateBodyId,
  validateBodyText,
  validateBodyUsername,
} from "../middleware/validator.js";

const tweetRouter = express.Router();

tweetRouter.get("/", isAuth, tweetController.getTweets);
tweetRouter.get("/:id", isAuth, tweetController.getTweet);
tweetRouter.post(
  "/",
  isAuth,
  [validateBodyText, validateBodyUsername, findErrors],
  tweetController.createTweet
);
tweetRouter.put(
  "/",
  isAuth,
  [validateBodyId, validateBodyText, validateBodyUsername, findErrors],
  tweetController.updateTweet
);
tweetRouter.delete(
  "/",
  isAuth,
  [validateBodyId, findErrors],
  tweetController.removeTweet
);

export default tweetRouter;
