import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiErrors.js";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadOnCloud = async (FileOnServer) => {
  try {
    if (!FileOnServer) return null;

    const absolutePath = path.resolve(FileOnServer);

    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "image",
      folder: "users",
    });

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    return response;

  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);

    if (FileOnServer && fs.existsSync(FileOnServer)) {
      fs.unlinkSync(FileOnServer);
    }

    throw error; 
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
