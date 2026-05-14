import { Request, Response } from "express";
import { ZodError } from "zod";
import * as skillService from "../services/skill.service";
import {
  createSkillValidation,
  updateSkillValidation,
} from "../validations/skill.validation";
import { errorResponse, successResponse } from "../utils/response";
import { uploadImageToSupabase } from "../utils/upload";
import { formatZodError } from "../utils/zod-error";

export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await skillService.getAllSkills();

    return successResponse(res, "Berhasil mengambil data skill", skills);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data skill", error);
  }
};

export const getSkillDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID skill tidak valid", null, 400);
    }

    const skill = await skillService.getSkillById(id);

    if (!skill) {
      return errorResponse(res, "Skill tidak ditemukan", null, 404);
    }

    return successResponse(res, "Berhasil mengambil detail skill", skill);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil detail skill", error);
  }
};

export const storeSkill = async (req: Request, res: Response) => {
  try {
    const payload = createSkillValidation.parse(req.body);

    let image: string | undefined;

    if (req.file) {
      image = await uploadImageToSupabase(req.file, "skills");
    }

    const skill = await skillService.createSkill({
      ...payload,
      image,
    });

    return successResponse(res, "Berhasil membuat skill", skill, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal membuat skill", error);
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID skill tidak valid", null, 400);
    }

    const checkSkill = await skillService.getSkillById(id);

    if (!checkSkill) {
      return errorResponse(res, "Skill tidak ditemukan", null, 404);
    }

    const payload = updateSkillValidation.parse(req.body);

    let image: string | undefined;

    if (req.file) {
      image = await uploadImageToSupabase(req.file, "skills");
    }

    const skill = await skillService.updateSkill(id, {
      ...payload,
      ...(image && { image }),
    });

    return successResponse(res, "Berhasil mengubah skill", skill);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal mengubah skill", error);
  }
};

export const destroySkill = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID skill tidak valid", null, 400);
    }

    const checkSkill = await skillService.getSkillById(id);

    if (!checkSkill) {
      return errorResponse(res, "Skill tidak ditemukan", null, 404);
    }

    await skillService.deleteSkill(id);

    return successResponse(res, "Berhasil menghapus skill");
  } catch (error) {
    return errorResponse(res, "Gagal menghapus skill", error);
  }
};