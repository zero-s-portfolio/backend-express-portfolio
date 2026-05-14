import { Request, Response } from "express";
import { ZodError } from "zod";
import * as settingSectionService from "../services/setting-section.service";
import {
  createSettingSectionValidation,
  updateSettingSectionValidation,
} from "../validations/setting-section.validation";
import { errorResponse, successResponse } from "../utils/response";
import { uploadImageToSupabase } from "../utils/upload";
import { formatZodError } from "../utils/zod-error";

export const getSettingSections = async (req: Request, res: Response) => {
  try {
    const settingSections =
      await settingSectionService.getAllSettingSections();

    return successResponse(
      res,
      "Berhasil mengambil data setting section",
      settingSections
    );
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data setting section", error);
  }
};

export const getSettingSectionDetail = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID setting section tidak valid", null, 400);
    }

    const settingSection =
      await settingSectionService.getSettingSectionById(id);

    if (!settingSection) {
      return errorResponse(res, "Setting section tidak ditemukan", null, 404);
    }

    return successResponse(
      res,
      "Berhasil mengambil detail setting section",
      settingSection
    );
  } catch (error) {
    return errorResponse(res, "Gagal mengambil detail setting section", error);
  }
};

export const getSettingSectionDetailbyKey = async (
  req: Request,
  res: Response
) => {
  try {
    const key = String(req.params.key);

    const settingSection = await settingSectionService.getSettingSectionByKey(key);

    if (!settingSection) {
      return errorResponse(res, "Setting section tidak ditemukan", null, 404);
    }

    return successResponse(
      res,
      "Berhasil mengambil detail setting section",
      settingSection
    );
  } catch (error) {
    return errorResponse(res, "Gagal mengambil detail setting section", error);
  }
};

export const storeSettingSection = async (req: Request, res: Response) => {
  try {
    const payload = createSettingSectionValidation.parse(req.body);

    let icon: string | undefined;

    if (req.file) {
      icon = await uploadImageToSupabase(req.file, "settings");
    }

    const settingSection =
      await settingSectionService.createSettingSection({
        ...payload,
        icon,
      });

    return successResponse(
      res,
      "Berhasil membuat setting section",
      settingSection,
      201
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal membuat setting section", error);
  }
};

export const updateSettingSection = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID setting section tidak valid", null, 400);
    }

    const checkSettingSection =
      await settingSectionService.getSettingSectionById(id);

    if (!checkSettingSection) {
      return errorResponse(res, "Setting section tidak ditemukan", null, 404);
    }

    const payload = updateSettingSectionValidation.parse(req.body);

    let icon: string | undefined;

    if (req.file) {
      icon = await uploadImageToSupabase(req.file, "settings");
    }

    const settingSection =
      await settingSectionService.updateSettingSection(id, {
        ...payload,
        ...(icon && { icon }),
      });

    return successResponse(
      res,
      "Berhasil mengubah setting section",
      settingSection
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal mengubah setting section", error);
  }
};

export const destroySettingSection = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID setting section tidak valid", null, 400);
    }

    const checkSettingSection =
      await settingSectionService.getSettingSectionById(id);

    if (!checkSettingSection) {
      return errorResponse(res, "Setting section tidak ditemukan", null, 404);
    }

    await settingSectionService.deleteSettingSection(id);

    return successResponse(res, "Berhasil menghapus setting section");
  } catch (error) {
    return errorResponse(res, "Gagal menghapus setting section", error);
  }
};