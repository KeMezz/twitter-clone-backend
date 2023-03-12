import express from "express";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";
import {
  findErrors,
  validateUsername,
  validatePassword,
  validateUrl,
} from "../middleware/validator.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  [validateUsername, validatePassword, validateUrl, findErrors],
  authController.signup
);
authRouter.post(
  "/login",
  [validateUsername, validatePassword, findErrors],
  authController.login
);
authRouter.get("/me", isAuth, authController.me);

export default authRouter;
