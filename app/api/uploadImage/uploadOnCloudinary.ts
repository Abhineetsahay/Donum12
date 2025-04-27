import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing required Cloudinary environment variables");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "Donum",
    });
    try {
      fs.unlinkSync(localFilePath);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.warn("Temp file already deleted:", err.message);
      } else {
        console.warn("Temp file already deleted:", err);
      }
    }

    return response.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};
