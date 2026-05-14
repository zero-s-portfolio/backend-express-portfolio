import { Request, Response } from "express";
import { ZodError } from "zod";
import * as authService from "../services/auth.service";
import { loginValidation } from "../validations/auth.validation";
import { errorResponse, successResponse } from "../utils/response";
import { clearAuthCookies, setAuthCookies } from "../utils/cookie";
import { formatZodError } from "../utils/zod-error";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/prisma";

export const login = async (req: Request, res: Response) => {
  try {
    const payload = loginValidation.parse(req.body);

    const result = await authService.login(payload);

    setAuthCookies(res, result.accessToken, result.refreshToken);

    return successResponse(res, "Login berhasil", {
      user: result.user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Email atau password salah", null, 401);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (req.user?.id) {
      await authService.logout(req.user.id);
    }

    clearAuthCookies(res);

    return successResponse(res, "Logout berhasil");
  } catch (error) {
    return errorResponse(res, "Logout gagal", error);
  }
};

export const me = async (req: Request, res: Response) => {
  return successResponse(res, "Berhasil mengambil data login", {
    user: req.user,
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return errorResponse(
        res,
        "Refresh token tidak ditemukan",
        null,
        401
      );
    }

    const decoded = verifyRefreshToken(refreshToken) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return errorResponse(res, "User tidak ditemukan", null, 404);
    }

    if (user.refreshToken !== refreshToken) {
      return errorResponse(
        res,
        "Refresh token tidak valid",
        null,
        401
      );
    }

    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    return successResponse(res, "Berhasil refresh token");
  } catch (error) {
    return errorResponse(res, "Refresh token expired", error, 401);
  }
};