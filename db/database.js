import { MongoClient } from "mongodb";
import { config } from "../config.js";

let db;
const client = new MongoClient(config.db.host);

export async function connectDB() {
  db = client.db("twiter_clone");
  return db;
}

export function getUsers() {
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}
