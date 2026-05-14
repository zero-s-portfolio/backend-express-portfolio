import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  errors?: unknown,
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};