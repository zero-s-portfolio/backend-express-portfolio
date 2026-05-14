import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { CreateUserInput, UpdateUserInput } from "../validations/user.validation";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    omit: {
      password: true,
      refreshToken: true,
    },
  });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    omit: {
      password: true,
      refreshToken: true,
    },
  });
};

export const createUser = async (payload: CreateUserInput) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    omit: {
      password: true,
      refreshToken: true,
    },
  });
};

export const updateUser = async (id: number, payload: UpdateUserInput) => {
  const data = { ...payload };

  if (payload.password) {
    data.password = await bcrypt.hash(payload.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data,
    omit: {
      password: true,
      refreshToken: true,
    },
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};