import jwt, { SignOptions } from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

const ACCESS_TOKEN_EXPIRES_IN = (process.env.ACCESS_TOKEN_EXPIRES_IN ||
  "15m") as SignOptions["expiresIn"];

const REFRESH_TOKEN_EXPIRES_IN = (process.env.REFRESH_TOKEN_EXPIRES_IN ||
  "7d") as SignOptions["expiresIn"];

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};