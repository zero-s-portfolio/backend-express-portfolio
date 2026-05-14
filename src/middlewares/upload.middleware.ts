import multer from "multer";

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("File harus berupa gambar"));
    }

    cb(null, true);
  },
});