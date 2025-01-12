import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import authRoute from "./routes/authRoute.js";
import userDataRoute from "./routes/userDataRoute.js";
import { connectMongodb } from "./config/mongodb.js";
import { connectCloudinary } from "./config/cloudinary.js";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 },
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", authRoute);
app.use("/", authenticateUser, userDataRoute);

connectMongodb();
connectCloudinary();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
