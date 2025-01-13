import mongoose from "mongoose";

export async function connectMongodb(DB_URL) {
  try {
    await mongoose.connect(`${DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });

    console.log("MongoDB connected.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}
