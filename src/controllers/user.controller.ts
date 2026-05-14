import { Request, Response } from "express";
import { ZodError } from "zod";
import * as userService from "../services/user.service";
import {
  createUserValidation,
  updateUserValidation,
} from "../validations/user.validation";
import { errorResponse, successResponse } from "../utils/response";
import { formatZodError } from "../utils/zod-error";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    return successResponse(res, "Berhasil mengambil data user", users);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data user", error);
  }
};

export const getUserDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID user tidak valid", null, 400);
    }

    const user = await userService.getUserById(id);

    if (!user) {
      return errorResponse(res, "User tidak ditemukan", null, 404);
    }

    return successResponse(res, "Berhasil mengambil detail user", user);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil detail user", error);
  }
};

export const storeUser = async (req: Request, res: Response) => {
  try {
    const payload = createUserValidation.parse(req.body);

    const user = await userService.createUser(payload);

    return successResponse(res, "Berhasil membuat user", user, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal membuat user", error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID user tidak valid", null, 400);
    }

    const checkUser = await userService.getUserById(id);

    if (!checkUser) {
      return errorResponse(res, "User tidak ditemukan", null, 404);
    }

    const payload = updateUserValidation.parse(req.body);

    const user = await userService.updateUser(id, payload);

    return successResponse(res, "Berhasil mengubah user", user);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal mengubah user", error);
  }
};

export const destroyUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID user tidak valid", null, 400);
    }

    const checkUser = await userService.getUserById(id);

    if (!checkUser) {
      return errorResponse(res, "User tidak ditemukan", null, 404);
    }

    await userService.deleteUser(id);

    return successResponse(res, "Berhasil menghapus user");
  } catch (error) {
    return errorResponse(res, "Gagal menghapus user", error);
  }
};