import { db } from "../db/database.js";

export const create = async (user) => {
  const { username, password, url } = user;
  return db
    .execute("INSERT INTO users (username, password, url) VALUES (?,?,?)", [
      username,
      password,
      url,
    ])
    .then((result) => {
      return result[0].insertId;
    })
    .catch(console.error);
};

export const findByUsername = async (username) => {
  return db
    .execute("SELECT * FROM users WHERE username=?", [username])
    .then((result) => {
      return result[0][0];
    });
};

export const findById = async (id) => {
  return db
    .execute("SELECT * FROM users WHERE id=?", [parseInt(id)])
    .then((result) => {
      return result[0][0];
    });
};
