import * as usersRepository from "../data/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secretKey = "Vw-fxufR8zoFK-iYVsyzHbXMo2pk_pr!";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export const signup = async (req, res) => {
  const { username, password, url } = req.body;
  const found = await usersRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await usersRepository.create({
    username,
    password: hashed,
    url,
  });
  const token = createJwtToken(userId);
  return res.status(201).json({ token, username });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await usersRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
};

const createJwtToken = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: jwtExpiresInDays });
};
