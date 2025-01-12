import mongoose from "mongoose";

export async function connectMongodb(DB_URL) {
  try {
    await mongoose.connect(`${DB_URL}`);

    console.log("MongoDB connected.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}
