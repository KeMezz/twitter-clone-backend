import express from "express";
import * as authController from "../controller/auth.js";
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

// authRouter.post("/me", (req, res, next) => {
//   const { token } = req.body;
//   jwt.verify(token, secret, (error) => {
//     if (error) {
//       return res.sendStatus(404);
//     } else {
//       return res.sendStatus(200);
//     }
//   });
// });

export default authRouter;
