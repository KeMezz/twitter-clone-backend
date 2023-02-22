import * as tweetRepository from "../data/tweet.js";

export const getTweets = (req, res) => {
  const username = req.query?.username;
  if (username) {
    res.status(200).send(tweetRepository.getAllByUsername(username));
  } else {
    res.status(200).send(tweetRepository.getAll());
  }
};

export const getTweet = (req, res) => {
  const id = req.params.id;
  const tweet = tweetRepository.getById(id);
  if (tweet) {
    res.status(200).send(tweet);
  } else {
    res.status(404).send(`tweet id ${id} not found.`);
  }
};

export const createTweet = (req, res) => {
  const username = req.body?.username;
  const text = req.body?.text;
  const tweet = tweetRepository.create(username, text);
  if (tweet) {
    res.status(201).send(tweet);
  } else {
    res.status(404).send(`username and text are both needed`);
  }
};

export const updateTweet = (req, res) => {
  const id = req.body?.id?.toString();
  const text = req.body?.text;
  const tweet = tweetRepository.update(id, text);
  if (tweet) {
    res.status(201).send(tweetRepository.update(id, text));
  } else {
    res.status(404).send(`tweet id ${id} not found`);
  }
};

export const removeTweet = (req, res) => {
  const id = req.body?.id?.toString();
  const tweets = tweetRepository.remove(id);
  if (tweets) {
    res.status(204).send(tweets);
  } else {
    res.status(404).send(`tweet id ${id} is not found.`);
  }
};
