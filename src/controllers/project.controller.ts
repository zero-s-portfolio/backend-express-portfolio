import { Request, Response } from "express";
import { ZodError } from "zod";
import * as projectService from "../services/project.service";
import {
  createProjectValidation,
  updateProjectValidation,
} from "../validations/project.validation";
import { errorResponse, successResponse } from "../utils/response";
import { uploadImageToSupabase } from "../utils/upload";
import { formatZodError } from "../utils/zod-error";

type ProjectFiles = {
  image?: Express.Multer.File[];
  hoverImage?: Express.Multer.File[];
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjects();

    return successResponse(res, "Berhasil mengambil data project", projects);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil data project", error);
  }
};

export const getProjectDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID project tidak valid", null, 400);
    }

    const project = await projectService.getProjectById(id);

    if (!project) {
      return errorResponse(res, "Project tidak ditemukan", null, 404);
    }

    return successResponse(res, "Berhasil mengambil detail project", project);
  } catch (error) {
    return errorResponse(res, "Gagal mengambil detail project", error);
  }
};

export const storeProject = async (req: Request, res: Response) => {
  try {
    const payload = createProjectValidation.parse(req.body);
    const files = req.files as ProjectFiles;

    let image: string | undefined;
    let hoverImage: string | undefined;

    if (files?.image?.[0]) {
      image = await uploadImageToSupabase(files.image[0], "projects");
    }

    if (files?.hoverImage?.[0]) {
      hoverImage = await uploadImageToSupabase(
        files.hoverImage[0],
        "projects/hover"
      );
    }

    const project = await projectService.createProject({
      ...payload,
      image,
      hoverImage,
    });

    return successResponse(res, "Berhasil membuat project", project, 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal membuat project", error);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID project tidak valid", null, 400);
    }

    const checkProject = await projectService.getProjectById(id);

    if (!checkProject) {
      return errorResponse(res, "Project tidak ditemukan", null, 404);
    }

    const payload = updateProjectValidation.parse(req.body);
    const files = req.files as ProjectFiles;

    let image: string | undefined;
    let hoverImage: string | undefined;

    if (files?.image?.[0]) {
      image = await uploadImageToSupabase(files.image[0], "projects");
    }

    if (files?.hoverImage?.[0]) {
      hoverImage = await uploadImageToSupabase(
        files.hoverImage[0],
        "projects/hover"
      );
    }

    const project = await projectService.updateProject(id, {
      ...payload,
      ...(image && { image }),
      ...(hoverImage && { hoverImage }),
    });

    return successResponse(res, "Berhasil mengubah project", project);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
    }

    return errorResponse(res, "Gagal mengubah project", error);
  }
};

export const destroyProject = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return errorResponse(res, "ID project tidak valid", null, 400);
    }

    const checkProject = await projectService.getProjectById(id);

    if (!checkProject) {
      return errorResponse(res, "Project tidak ditemukan", null, 404);
    }

    await projectService.deleteProject(id);

    return successResponse(res, "Berhasil menghapus project");
  } catch (error) {
    return errorResponse(res, "Gagal menghapus project", error);
  }
};