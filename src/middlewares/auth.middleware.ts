import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../utils/jwt";
import { errorResponse } from "../utils/response";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return errorResponse(res, "Unauthorized, token tidak ditemukan", null, 401);
    }

    const decoded = verifyAccessToken(token) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch {
    return errorResponse(res, "Unauthorized, token tidak valid", null, 401);
  }
};