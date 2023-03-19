import mysql from "mysql2";
import { config } from "../config.js";
import { Sequelize } from "sequelize";

const { database, user, password, host, port } = config.db;

export const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "mysql",
});

const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

export const db = pool.promise();
