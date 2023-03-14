import express from "express";
import * as tweetController from "../controller/tweet.js";
import { isAuth } from "../middleware/auth.js";
import {
  findErrors,
  validateId,
  validateText,
} from "../middleware/validator.js";

const tweetRouter = express.Router();

tweetRouter.get("/", isAuth, tweetController.getTweets);
tweetRouter.get("/:id", isAuth, tweetController.getTweet);
tweetRouter.post(
  "/",
  isAuth,
  [validateText, findErrors],
  tweetController.createTweet
);
tweetRouter.put(
  "/",
  isAuth,
  [validateId, validateText, findErrors],
  tweetController.updateTweet
);
tweetRouter.delete(
  "/",
  isAuth,
  [validateId, findErrors],
  tweetController.removeTweet
);

export default tweetRouter;
