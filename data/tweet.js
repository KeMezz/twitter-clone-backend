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

export const getAll = () => tweets;

export const getAllByUsername = (username) =>
  tweets.filter((tweet) => tweet.username === username);

export const get = (id) => tweets.find((tweet) => tweet.id === id);

export const create = (text, name, username) => {
  const newTweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  return (tweets = [newTweet, ...tweets]);
};

export const remove = (id) => {
  return (tweets = tweets.filter((tweet) => tweet.id !== id));
};

export const update = (id, text) => {
  let tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
};
