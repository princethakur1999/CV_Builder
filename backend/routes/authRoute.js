import express from "express";

const router = express.Router();

import {
  generateOTP,
  signup,
  login,
  forgotPassword,
  changePassword,
} from "../controllers/authController.js";

router.post("/generate-otp", generateOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);

export default router;
