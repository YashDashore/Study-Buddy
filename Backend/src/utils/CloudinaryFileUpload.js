import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiErrors.js";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadOnCloud = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    return await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "users",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(fileBuffer);
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new ApiError(500, "Image upload failed");
  }
};

const DeleteOnCloud = async (PublicId) => {
  try {
    await cloudinary.uploader.destroy(PublicId);
    return null;
  } catch (error) {
    throw new ApiError(500, "Image on cloud cannot be deleted");
  }
}

export { UploadOnCloud, DeleteOnCloud };
