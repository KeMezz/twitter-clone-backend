export const tweets = [
  {
    id: 1676444678643,
    username: "bob",
    text: "안녕 반가워 :)",
    createdAt: "2023-02-15T07:04:38.643Z",
  },
  {
    id: 1676444762544,
    username: "hyeongjin",
    text: "진짜 신기하다!!",
    createdAt: "2023-02-15T07:06:02.544Z",
  },
  {
    id: 1676444762546,
    username: "hyeongjin",
    text: "이게 뭔데??",
    createdAt: "2023-02-15T07:06:02.544Z",
  },
];

export const getAll = () => {
  return tweets;
};
export const getAllByUsername = (username) => {
  return tweets.filter((tweet) => tweet.username === username);
};
export const getById = (id) => {
  return tweets.find((tweet) => tweet.id.toString() === id.toString());
};
export const create = (username, text) => {
  if (!username || !text) {
    return undefined;
  }
  const newTweet = {
    id: Date.now(),
    username,
    text,
    createdAt: new Date().toISOString(),
  };
  tweets.splice(0, 0, newTweet);
  return newTweet;
};
export const update = (id, text) => {
  const targetIndex = tweets.findIndex((tweet) => tweet.id.toString() === id);
  if (targetIndex < 0) {
    return undefined;
  } else {
    const newTweet = {
      ...tweets.find((tweet) => tweet.id.toString() === id),
      text,
    };
    tweets.splice(targetIndex, 1, newTweet);
    return newTweet;
  }
};
export const remove = (id) => {
  const targetIndex = tweets.findIndex((tweet) => tweet.id.toString() === id);
  if (targetIndex < 0) {
    return undefined;
  } else {
    tweets.splice(targetIndex, 1);
    return tweets;
  }
};
