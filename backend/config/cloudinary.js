import cloudinary from "cloudinary";

export function connectCloudinary(CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET) {
  try {
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: CLOUD_API_KEY,
      api_secret: CLOUD_API_SECRET,
    });
    console.log("Cloudinary connected.");
  } catch (error) {
    console.error(error);
  }
}
