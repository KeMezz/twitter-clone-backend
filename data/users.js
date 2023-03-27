// import { DataTypes } from "sequelize";
// import { sequelize } from "../db/database.js";

// export const User = sequelize.define("users", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false,
//   },
//   username: {
//     type: DataTypes.STRING(45),
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING(128),
//     allowNull: false,
//   },
//   url: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
// });

// export const create = async (user) => {
//   return User.create(user).then(({ dataValues }) => dataValues.id);
// };

// export const findByUsername = async (username) => {
//   return User.findOne({ where: { username } });
// };

// export const findById = async (id) => {
//   return User.findByPk(id);
// };
