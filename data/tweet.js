import * as userRepository from "./users.js";

export const tweets = [
  {
    id: 1676444678643,
    text: "안녕 반가워 :)",
    createdAt: "2023-02-15T07:04:38.643Z",
    userId: "1",
  },
  {
    id: 1676444762544,
    text: "진짜 신기하다!!",
    createdAt: "2023-02-15T07:06:02.544Z",
    userId: "2",
  },
  {
    id: 1676444762546,
    text: "이게 뭔데??",
    createdAt: "2023-02-15T07:06:02.544Z",
    userId: "2",
  },
];

export const getAll = async () => {
  return Promise.all(
    tweets.map(async (tweet) => {
      const user = await userRepository.findById(tweet.userId);
      if (!user) {
        return null;
      }
      return { ...tweet, ...user };
    })
  );
};

export const getAllByUserId = async (userId) => {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.userId === userId)
  );
};

export const getById = async (id) => {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const user = await userRepository.findById(found.userId);
  if (!user) {
    return null;
  }
  return { ...found, ...user };
};

export const create = async (userId, text) => {
  const newTweet = {
    id: Date.now(),
    text,
    createdAt: new Date().toISOString(),
    userId,
  };
  tweets.splice(0, 0, newTweet);
  return getById(newTweet.id);
};

export const update = async (id, text) => {
  const targetIndex = tweets.findIndex((tweet) => tweet.id.toString() === id);
  if (targetIndex < 0) {
    return null;
  } else {
    const newTweet = {
      ...tweets.find((tweet) => tweet.id.toString() === id),
      text,
    };
    tweets.splice(targetIndex, 1, newTweet);
    return getById(newTweet.id);
  }
};
export const remove = async (id) => {
  const targetIndex = tweets.findIndex((tweet) => tweet.id.toString() === id);
  if (targetIndex < 0) {
    return null;
  } else {
    tweets.splice(targetIndex, 1);
    return tweets;
  }
};
