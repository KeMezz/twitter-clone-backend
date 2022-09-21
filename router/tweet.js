import express from "express";

const tweetRouter = express.Router();

tweetRouter.post("/", (req, res, next) => {
  console.log(req);
  res.sendStatus(201);
});

tweetRouter.get("/:id", (req, res, next) => {
  //
  res.send(400);
});

export default tweetRouter;
