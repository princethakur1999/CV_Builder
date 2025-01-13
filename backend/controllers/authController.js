import User from "../models/user.js";
import OTP from "../models/otp.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email.js";
import { welcomeBody } from "../templates/welcome.js";

export async function generateOTP(req, res) {
  try {
    const { email } = req.body;

    console.log(email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let otp = "";

    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    const otpDoc = new OTP({
      otp,
      email,
    });

    await otpDoc.save();

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function signup(req, res) {
  try {
    const { firstName, lastName, email, password, confirmPassword, otp } =
      req.body;

    // Validate all required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    // Password validation
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 8 and 20 characters long",
      });
    }

    // Check if the email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Verify the OTP
    const otpDoc = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!otpDoc || otpDoc.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Optionally, delete the OTP document after successful verification
    await OTP.deleteOne({ email });

    const body = welcomeBody(firstName);

    await sendEmail(email, "Accout Created", body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = { userId: user._id, email: user.email };
    const SECRET = process.env.JWT_SECRET || "000000";
    const options = { expiresIn: "2h" };

    // Generate JWT token
    const token = jwt.sign(payload, SECRET, options);

    // Respond with success and the token
    return res.json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function forgotPassword(req, res) {}
export async function changePassword(req, res) {}
