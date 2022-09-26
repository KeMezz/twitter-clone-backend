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
tweetsRouter.get("/", (req, res) => {
  const username = req.query.username;
  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;
  res.status(200).json(data);
});

/** GET tweet by tweet id
 *
 */
tweetsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const data = tweets.find((tweet) => tweet.id === id);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Tweet ${id} Not Found` });
  }
});

/** POST tweet
 *
 */
tweetsRouter.post("/", (req, res) => {
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

/** DELETE tweet
 *
 */
tweetsRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  if (tweets.find((tweet) => tweet.id === id)) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `요청하신 트윗을 찾을 수 없습니다.` });
  }
});

/** PUT tweet
 *
 */
tweetsRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const newText = req.body.text;
  let tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.text = newText;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `요청하신 트윗을 찾을 수 없습니다.` });
  }
});

export default tweetsRouter;
