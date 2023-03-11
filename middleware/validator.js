import { body, validationResult } from "express-validator";

export const findErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
};

export const validateBodyUsername = body("username")
  .trim()
  .isLength({ min: 4 })
  .withMessage("username을 입력해주세요.");

export const validateBodyText = body("text")
  .trim()
  .isLength({ max: 200 })
  .withMessage("트윗 내용은 200자를 넘을 수 없습니다.");

export const validateBodyId = body("id")
  .isNumeric()
  .withMessage("id 형식이 올바르지 않습니다.");

export const validatePassword = body("password")
  .isLength({ min: 5 })
  .withMessage("Password too short.");

export const validateUrl = body("url")
  .isURL()
  .withMessage("invalid URL")
  .optional({ nullable: true, checkFalsy: true });
