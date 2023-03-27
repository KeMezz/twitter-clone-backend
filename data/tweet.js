// import { Sequelize, DataTypes } from "sequelize";
// import { sequelize } from "../db/database.js";
// import { User } from "./users.js";

// const Tweet = sequelize.define("tweets", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false,
//   },
//   text: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
// });
// Tweet.belongsTo(User);

// const INCLUDE_USER = {
//   attributes: [
//     "id",
//     "text",
//     "createdAt",
//     "userId",
//     [Sequelize.col("user.username"), "username"],
//     [Sequelize.col("user.url"), "url"],
//   ],
//   include: {
//     model: User,
//     attributes: [],
//   },
// };
// const ORDER_DESC = { order: [["createdAt", "DESC"]] };

// export const getAll = async () => {
//   return Tweet.findAll({
//     ...INCLUDE_USER,
//     ...ORDER_DESC,
//   });
// };

// export const getAllByUserId = async (userId) => {
//   return Tweet.findAll({
//     ...INCLUDE_USER,
//     ...ORDER_DESC,
//     include: {
//       ...INCLUDE_USER.include,
//       where: { userId },
//     },
//   });
// };

// export const getById = (id) => {
//   return Tweet.findOne({ where: { id }, ...INCLUDE_USER });
// };

// export const create = async (userId, text) => {
//   return Tweet.create({ text, userId }).then((data) =>
//     getById(data.dataValues.id)
//   );
// };

// export const update = async (id, text) => {
//   return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
//     tweet.text = text;
//     return tweet.save();
//   });
// };

// export const remove = async (id) => {
//   return Tweet.findByPk(id, INCLUDE_USER)
//     .then((tweet) => {
//       if (tweet) {
//         tweet.destroy();
//       }
//       return tweet;
//     })
//     .catch(console.error);
// };
