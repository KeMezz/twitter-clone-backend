import * as tweetRepository from "../data/tweet.js";

export const getTweets = async (req, res) => {
  const username = req.query?.username;
  if (username) {
    res.status(200).send(await tweetRepository.getAllByUsername(username));
  } else {
    res.status(200).send(await tweetRepository.getAll());
  }
};

export const getTweet = async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).send(tweet);
  } else {
    res.status(404).send(`tweet id ${id} not found.`);
  }
};

export const createTweet = async (req, res) => {
  const username = req.body?.username;
  const text = req.body?.text;
  const tweet = await tweetRepository.create(username, text);
  if (tweet) {
    res.status(201).send(tweet);
  } else {
    res.status(404).send(`username and text are both needed`);
  }
};

export const updateTweet = async (req, res) => {
  const id = req.body?.id?.toString();
  const text = req.body?.text;
  const tweet = await tweetRepository.update(id, text);
  if (tweet) {
    res.status(201).send(await tweetRepository.update(id, text));
  } else {
    res.status(404).send(`tweet id ${id} not found`);
  }
};

export const removeTweet = async (req, res) => {
  const id = req.body?.id?.toString();
  const tweets = await tweetRepository.remove(id);
  if (tweets) {
    res.status(204).send(tweets);
  } else {
    res.status(404).send(`tweet id ${id} is not found.`);
  }
};
