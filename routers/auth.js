import express from "express";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";
import {
  findErrors,
  validateBodyUsername,
  validatePassword,
  validateUrl,
} from "../middleware/validator.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  [validateBodyUsername, validatePassword, validateUrl, findErrors],
  authController.signup
);
authRouter.post(
  "/login",
  [validateBodyUsername, validatePassword, findErrors],
  authController.login
);
authRouter.get("/me", isAuth, authController.me);

export default authRouter;
