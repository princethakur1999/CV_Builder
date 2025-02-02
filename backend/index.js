import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRoute from "./routes/authRoute.js";
import userDataRoute from "./routes/userDataRoute.js";
import { connectMongodb } from "./config/mongodb.js";
import { connectCloudinary } from "./config/cloudinary.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  })
);

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.use("/auth", authRoute);
app.use("/user", userDataRoute);

connectMongodb(DB_URL);
connectCloudinary(CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
