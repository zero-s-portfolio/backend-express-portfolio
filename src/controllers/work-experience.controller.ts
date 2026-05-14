import { Request, Response } from "express";
import { ZodError } from "zod";
import * as workExperienceService from "../services/work-experience.service";
import {
  createWorkExperienceValidation,
  updateWorkExperienceValidation,
} from "../validations/work-experience.validation";
import { errorResponse, successResponse } from "../utils/response";
import { formatZodError } from "../utils/zod-error";

export const getWorkExperiences = async (req: Request, res: Response) => {
  try {
    const workExperiences =
      await workExperienceService.getAllWorkExperiences();

    return successResponse(
      res,
      "Berhasil mengambil data work experience",
      workExperiences
    );
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data work experience", error);
  }
};

export const getWorkExperienceDetail = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID work experience tidak valid", null, 400);
    }

    const workExperience =
      await workExperienceService.getWorkExperienceById(id);

    if (!workExperience) {
      return errorResponse(res, "Work experience tidak ditemukan", null, 404);
    }

    return successResponse(
      res,
      "Berhasil mengambil detail work experience",
      workExperience
    );
  } catch (error) {
    return errorResponse(res, "Gagal mengambil detail work experience", error);
  }
};

export const storeWorkExperience = async (req: Request, res: Response) => {
  try {
    const payload = createWorkExperienceValidation.parse(req.body);

    const workExperience =
      await workExperienceService.createWorkExperience(payload);

    return successResponse(
      res,
      "Berhasil membuat work experience",
      workExperience,
      201
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal membuat work experience", error);
  }
};

export const updateWorkExperience = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID work experience tidak valid", null, 400);
    }

    const checkWorkExperience =
      await workExperienceService.getWorkExperienceById(id);

    if (!checkWorkExperience) {
      return errorResponse(res, "Work experience tidak ditemukan", null, 404);
    }

    const payload = updateWorkExperienceValidation.parse(req.body);

    const workExperience =
      await workExperienceService.updateWorkExperience(id, payload);

    return successResponse(
      res,
      "Berhasil mengubah work experience",
      workExperience
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal mengubah work experience", error);
  }
};

export const destroyWorkExperience = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID work experience tidak valid", null, 400);
    }

    const checkWorkExperience =
      await workExperienceService.getWorkExperienceById(id);

    if (!checkWorkExperience) {
      return errorResponse(res, "Work experience tidak ditemukan", null, 404);
    }

    await workExperienceService.deleteWorkExperience(id);

    return successResponse(res, "Berhasil menghapus work experience");
  } catch (error) {
    return errorResponse(res, "Gagal menghapus work experience", error);
  }
};