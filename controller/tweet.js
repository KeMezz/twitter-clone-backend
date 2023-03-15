import { getSocket } from "../connection/socket.js";
import * as tweetRepository from "../data/tweet.js";

export const getTweets = async (req, res) => {
  const { userId } = req.query;
  if (userId) {
    res.status(200).send(await tweetRepository.getAllByUserId(userId));
  } else {
    res.status(200).send(await tweetRepository.getAll());
  }
};

export const getTweet = async (req, res) => {
  const { id } = req.params;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).send(tweet);
  } else {
    res.status(404).send(`tweet id ${id} not found.`);
  }
};

export const createTweet = async (req, res) => {
  getSocket().emit("tweetUpdated");
  const { userId } = req;
  const { text } = req.body;
  const tweet = await tweetRepository.create(userId, text);
  if (tweet) {
    res.status(201).send(tweet);
  } else {
    res.status(404).send(`can't create tweet properly`);
  }
};

export const updateTweet = async (req, res) => {
  getSocket().emit("tweetUpdated");
  const { userId } = req;
  const { id, text } = req.body;
  const tweet = await tweetRepository.update(id, text);
  if (tweet) {
    res.status(201).send(tweet);
  } else if (userId !== tweet.userId) {
    res.status(403).json(`can't update other person's tweet`);
  } else {
    res.status(404).send(`tweet id ${id} not found`);
  }
};

export const removeTweet = async (req, res) => {
  getSocket().emit("tweetUpdated");
  const { userId } = req;
  const { id } = req.body;
  const tweet = await tweetRepository.remove(id);
  if (tweet) {
    res.sendStatus(204);
  } else if (userId !== tweet.userId) {
    res.status(403).json(`can't delete other person's tweet`);
  } else {
    res.status(404).send(`tweet id ${id} is not found.`);
  }
};
