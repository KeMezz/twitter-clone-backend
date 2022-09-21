import express from "express";
import "express-async-errors";

let tweets = [
  {
    id: "1",
    text: "엥? 이게 트윗 내용이라구?",
    createdAt: Date.now(),
    name: "정형진",
    username: "hyeongjin",
    url: `https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg`,
  },
  {
    id: "2",
    text: "하 백엔드 너무 어렵네;",
    createdAt: Date.now(),
    name: "bob",
    username: "bob",
    url: `https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg`,
  },
  {
    id: "3",
    text: "리액트랑 익스프레스 조합은 댕꿀",
    createdAt: Date.now(),
    name: "bob",
    username: "bob",
    url: `https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg`,
  },
];
const tweetsRouter = express.Router();

/** GET tweets
 *
 */
tweetsRouter.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
  res.status(200).json(data);
});

/** Get tweet by tweet id
 *
 */
tweetsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const data = tweets.find((tweet) => tweet.id === id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Tweet ${id} Not Found` });
  }
});

/** Post tweet
 *
 */
tweetsRouter.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

/** Delete tweet
 *
 */
tweetsRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);

  res.sendStatus(204);
});

tweetsRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const newText = req.body.text;
  let tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.text = newText;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet ${id} Not Found` });
  }
});

export default tweetsRouter;
