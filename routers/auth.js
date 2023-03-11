import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "../data/users.js";

const authRouter = express.Router();
const secret = "Vw-fxufR8zoFK-iYVsyzHbXMo2pk_pr!";

authRouter.post("/signup", (req, res, next) => {
  const { username, password, url } = req.body;
  bcrypt.hash(password, 10).then((bcrypted) => {
    const newUser = {
      username,
      password: bcrypted,
      url,
    };
    users.push(newUser);
    return res.status(201).send(users);
  });
});

authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  bcrypt.compare(password, user.password).then((isMatched) => {
    if (isMatched) {
      const token = jwt.sign({ username }, secret, { expiresIn: 1000 });
      return res.status(200).send({ token });
    } else {
      return res.sendStatus(404);
    }
  });
});

authRouter.post("/me", (req, res, next) => {
  const { token } = req.body;
  jwt.verify(token, secret, (error) => {
    if (error) {
      return res.sendStatus(404);
    } else {
      return res.sendStatus(200);
    }
  });
});

export default authRouter;
