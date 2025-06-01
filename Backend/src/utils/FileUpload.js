import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadOnCloud = async (FileOnServer) => {
  try {
    if (!FileOnServer) return null;
    const response = await cloudinary.uploader.upload(FileOnServer, {
      resource_type: "auto",
    });
    fs.unlinkSync(FileOnServer);
    return response.url;
  } catch (error) {
    fs.unlinkSync(FileOnServer);
    return null;
  }
};

export { UploadOnCloud };
