import { User } from "../db/database.js";

export const create = async (user) => {
  return User.create(user).then(({ dataValues }) => dataValues.id);
};

export const findByUsername = async (username) => {
  return User.findOne({ where: { username } });
};

export const findById = async (id) => {
  return User.findByPk(id);
};
