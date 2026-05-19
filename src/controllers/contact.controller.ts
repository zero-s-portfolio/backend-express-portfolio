import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";
import {
  createContactMessageSchema,
  replyContactMessageSchema,
  updateContactStatusSchema,
} from "../validations/contact.validation";
import { errorResponse, successResponse } from "../utils/response";
import { formatZodError } from "../utils/zod-error";
import { ZodError } from "zod";

export class ContactController {
  static async create(req: Request, res: Response) {
    try {
      const body = createContactMessageSchema.parse(req.body);

      const data = await ContactService.create({
        ...body,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      });

      return successResponse(res, "Pesan berhasil dikirim", data, 201);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
      }
    
      return errorResponse(res, "Gagal mengirim pesan", error);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await ContactService.getAll();

      return successResponse(res, "Contact message get successfully", data, 200);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
      }
    
      return errorResponse(res, error.message ?? "Gagal mendapatkan pesan", error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const data = await ContactService.getById(id);

      if (!data) {
        return errorResponse(res, "Contact message not found", null);
      }

      return successResponse(res, "Contact message get successfully", data, 200);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
      }
    
      return errorResponse(res, error.message ?? "Gagal mendapatkan pesan", error);
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const body = updateContactStatusSchema.parse(req.body);

      const data = await ContactService.updateStatus(id, body.status);

      return successResponse(res, "Contact message updated successfully", data, 200);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
      }
    
      return errorResponse(res, error.message ?? "Gagal mengupdate pesan", error);
    }
  }

  static async reply(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const body = replyContactMessageSchema.parse(req.body);

      const data = await ContactService.reply(id, body.replyMessage);

      return successResponse(res, "Contact message replied successfully", data, 200);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
      }
    
      return errorResponse(res, error.message ?? "Gagal reply pesan", error);
    }
  }

  static async toggleStar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const data = await ContactService.toggleStar(id);

      return successResponse(res, "Contact message star successfully", data, 200);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
      }
    
      return errorResponse(res, error.message ?? "Gagal star pesan", error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await ContactService.delete(id);

      return successResponse(res, "Contact message delete successfully", true, 200);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, "Validasi gagal", formatZodError(error), 422);
      }
    
      return errorResponse(res, error.message ?? "Gagal menghapus pesan", error);
    }
  }
}