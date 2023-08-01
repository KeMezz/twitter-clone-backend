import { body, validationResult } from "express-validator";

export const findErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  } else {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
};

export const validateUsername = body("username")
  .trim()
  .isLength({ min: 4, max: 12 })
  .withMessage("username은 4자 이상, 12자 이하여야 합니다.");

export const validateText = body("text")
  .trim()
  .isLength({ max: 120 })
  .withMessage("트윗 내용은 120자를 넘을 수 없습니다.");

export const validateId = body("id")
  .exists()
  .withMessage("ID 형식이 올바르지 않습니다.");

export const validateUserId = body("userId")
  .exists()
  .withMessage("userId를 입력해주세요.");

export const validatePassword = body("password")
  .isLength({ min: 5, max: 22 })
  .withMessage("비밀번호는 최소 5자 이상, 최대 22자 이하여야 합니다.");

export const validateUrl = body("url")
  .isURL()
  .withMessage("URL 형식이 올바르지 않습니다.")
  .optional({ nullable: true, checkFalsy: true });
