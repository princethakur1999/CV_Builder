import mongoose from "mongoose";
import { otpBody } from "../templates/otp.js";
import { sendEmail } from "../utils/email.js";

// Define OTP schema
const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // 5 minutes in seconds
  },
});

// Helper function to send OTP email
async function sendOtpEmail(otp, email) {
  try {
    const body = otpBody(otp);
    await sendEmail(email, "OTP", body);
  } catch (error) {
    console.error(`Failed to send OTP email to ${email}:`, error.message);
  }
}

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendOtpEmail(this.otp, this.email);
  }
  next();
});

// Export the model
export default mongoose.model("OTP", otpSchema);
