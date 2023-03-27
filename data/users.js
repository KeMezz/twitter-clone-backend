import { ObjectId } from "mongodb";
import { getUsers } from "../db/database.js";

export const create = async (user) => {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
};

export const findByUsername = async (username) => {
  return getUsers().findOne({ username }).then(mapOptionalUser);
};

export const findById = async (id) => {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
};

function mapOptionalUser(user) {
  if (user) {
    return { ...user, id: user._id };
  } else {
    return null;
  }
}
