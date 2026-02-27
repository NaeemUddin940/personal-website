import { v2 as cloudinary } from "cloudinary";
export const deleteFromCloudinary = async (publicId: string): Promise<any> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.log("Failed to delete image from Cloudinary :", error);
  }
};
