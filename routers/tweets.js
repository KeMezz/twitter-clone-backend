import express from "express";

const tweetsRouter = express.Router();

const tweets = [
  {
    id: 1676444678643,
    username: "Bob",
    text: "안녕 반가워 :)",
    createdAt: "2023-02-15T07:04:38.643Z",
  },
  {
    id: 1676444762544,
    username: "hyeongjin",
    text: "진짜 신기하다!!",
    createdAt: "2023-02-15T07:06:02.544Z",
  },
];

tweetsRouter.get("/", (req, res, next) => {
  res.send(tweets);
});

export default tweetsRouter;
