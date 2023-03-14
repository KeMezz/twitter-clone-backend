import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Key ${key} is undefined.`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET_KEY"),
    expiresInDays: required("JWT_EXPIRES_IN_DAYS", "2d"),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
};
