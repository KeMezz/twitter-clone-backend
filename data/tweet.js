import { ObjectId } from "mongodb";
import { getTweets } from "../db/database.js";
import * as userRepository from "./users.js";

export const getAll = async () => {
  return getTweets().find().sort({ createdAt: -1 }).toArray().then(mapTweets);
};

export const getAllByUserId = async (userId) => {
  return getTweets()
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
};

export const getById = (id) => {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
};

export const create = async (userId, text) => {
  const { username, url } = await userRepository.findById(userId);
  const tweet = {
    text,
    createdAt: new Date(),
    userId,
    username,
    url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
};

export const update = async (id, text) => {
  return getTweets()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { text } },
      { returnDocument: "after" } // 수정이 된 다음의 객체를 리턴 받기 위해 명시가 필요함.
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
};

export const remove = async (id) => {
  return getTweets()
    .findOneAndDelete({ _id: new ObjectId(id) })
    .then((result) => result.value);
};

function mapOptionalTweet(tweet) {
  if (tweet) {
    return { ...tweet, id: tweet._id.toString() };
  } else {
    return tweet;
  }
}

function mapTweets(tweets) {
  if (tweets) {
    return tweets.map(mapOptionalTweet);
  } else {
    return tweets;
  }
}
