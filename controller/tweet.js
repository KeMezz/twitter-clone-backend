import * as tweetRepository from "../data/tweet.js";

export const getTweets = async (req, res) => {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());

  res.status(200).json(data);
};

export const getTweet = async (req, res) => {
  const { text, name, username } = req.body;
  const tweet = await tweetRepository.create(text, name, username);

  res.status(201).json(tweet);
};

export const getTweetById = async (req, res) => {
  const id = req.params.id;
  const data = await tweetRepository.get(id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Tweet ${id} Not Found` });
  }
};

export const deleteTweet = async (req, res) => {
  const id = req.params.id;
  const data = await tweetRepository.remove(id);

  if (data) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `요청하신 트윗을 찾을 수 없습니다.` });
  }
};

export const updateTweet = async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const data = await tweetRepository.update(id, text);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `요청하신 트윗을 찾을 수 없습니다.` });
  }
};
