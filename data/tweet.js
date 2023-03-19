import { db } from "../db/database.js";

const SELECT_JOIN = `SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id`;
const ORDER_DESC = `ORDER BY tw.createdAt DESC`;

export const getAll = async () => {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
};

export const getAllByUserId = async (userId) => {
  return db
    .execute(`${SELECT_JOIN} WHERE userId=? ${ORDER_DESC}`, [userId])
    .then((result) => result[0]);
};

export const getById = (id) => {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => {
      const tweet = result[0][0];
      if (!tweet) {
        return null;
      }
      return tweet;
    })
    .catch(console.error);
};

export const create = (userId, text) => {
  return db
    .execute(`INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)`, [
      text,
      new Date(),
      userId,
    ])
    .then((result) => {
      return getById(result[0].insertId);
    })
    .catch(console.error);
};

export const update = async (id, text) => {
  return db
    .execute(`UPDATE tweets SET text=? WHERE id=?`, [text, id])
    .then(() => getById(id));
};
export const remove = async (id) => {
  return db.execute(`DELETE FROM tweets WHERE id=?`, [id]);
};
