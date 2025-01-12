import mongoose from "mongoose";

export async function connectMongodb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/cv");

    console.log("MongoDB connected.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}
