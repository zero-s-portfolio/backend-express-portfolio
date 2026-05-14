import { supabase } from "../config/supabase";

export const uploadImageToSupabase = async (
  file: Express.Multer.File,
  folder: string
) => {
  const bucket = process.env.SUPABASE_BUCKET as string;

  const ext = file.originalname.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.${ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return data.publicUrl;
};