import * as usersRepository from "../data/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config.js";

const loginError = { message: "Invalid user or password" };

export const signup = async (req, res) => {
  const { username, password, url } = req.body;
  const found = await usersRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const user = await usersRepository.create({
    username,
    password: hashed,
    url,
  });
  const token = createJwtToken(user);
  res.status(201).json({ token, username, url });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await usersRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json(loginError);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json(loginError);
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username, userId: user.id, url: user.url });
};

export const me = async (req, res) => {
  const user = await usersRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
};

const createJwtToken = (id) => {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInDays,
  });
};
