import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import multer from "multer";
import { errorResponse } from "./utils/response";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://app.apidog.com", "https://zero-sensei.my.id"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend portfolio API is running",
  });
});

app.use("/api", routes);

// ERROR HANDLER
app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return errorResponse(res, "Ukuran file maksimal 3MB", null, 400);
    }

    return errorResponse(res, err.message, null, 400);
  }

  if (err) {
    return errorResponse(res, err.message || "Terjadi kesalahan", null, 400);
  }

  next();
});

export default app;