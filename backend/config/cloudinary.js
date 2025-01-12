import cloudinary from "cloudinary";

export function connectCloudinary() {
  try {
    cloudinary.config({
      cloud_name: "dsrz6p2su",
      api_key: "786683125151779",
      api_secret: "33Ba1uejxwx6r0WbNzty21ubSbg",
    });
    console.log("Cloudinary connected.");
  } catch (error) {
    console.error(error);
  }
}
