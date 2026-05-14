import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { LoginInput } from "../validations/auth.validation";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const login = async (payload: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new Error("Email atau password salah");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Email atau password salah");
  }

  const tokenPayload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshToken,
    },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const logout = async (userId: number) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken: null,
    },
  });
};