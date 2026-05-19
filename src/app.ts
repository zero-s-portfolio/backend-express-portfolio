import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";

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

export default app;