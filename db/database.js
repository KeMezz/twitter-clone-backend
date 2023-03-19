import { config } from "../config.js";
import { Sequelize } from "sequelize";

const { database, user, password, host, port } = config.db;

export const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "mysql",
});
