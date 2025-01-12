import { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/account" replace />;
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setSignupDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const otpHandler = async () => {
    try {
      if (
        !signupDetails.firstName ||
        !signupDetails.lastName ||
        !signupDetails.email ||
        !signupDetails.password ||
        !signupDetails.confirmPassword
      ) {
        toast.error("Please fill all the fields!");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupDetails.email)) {
        toast.error("Invalid email address!");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/generate-otp`,
        { email: signupDetails.email }
      );
      setLoading(false);

      if (response.data.success) {
        setOtpGenerated(true);
        toast.success("OTP sent successfully!");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Please try again.");
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      if (
        !signupDetails.firstName ||
        !signupDetails.lastName ||
        !signupDetails.email ||
        !signupDetails.password ||
        !signupDetails.confirmPassword ||
        !signupDetails.otp
      ) {
        toast.error("Please fill all the fields!");
        return;
      }

      if (signupDetails.password !== signupDetails.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      if (signupDetails.otp.length !== 6 || isNaN(signupDetails.otp)) {
        toast.error("Please enter a valid 6-digit OTP.");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        signupDetails
      );
      setLoading(false);

      if (response.data.success) {
        navigate("/login");
        toast.success("Signup successful!");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Please try again.");
    }
  };

  useEffect(() => {
    document.title = "Signup";
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      {loading && <Loader />}
      <div className="bg-opacity-30 backdrop-blur-md bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-8 rounded-xl shadow-xl w-[90%] md:w-[50%] lg:w-[35%] flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-green-500">Signup</h1>
        <form
          onSubmit={signupHandler}
          className="w-full flex flex-col items-center gap-4"
        >
          <input
            className="w-full bg-transparent text-white placeholder:text-gray-300 outline-none border-b-2 border-gray-400 focus:border-green-500 rounded-none px-4 py-3 transition-all"
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            value={signupDetails.firstName}
            onChange={changeHandler}
            disabled={loading}
          />

          <input
            className="w-full bg-transparent text-white placeholder:text-gray-300 outline-none border-b-2 border-gray-400 focus:border-green-500 rounded-none px-4 py-3 transition-all"
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            value={signupDetails.lastName}
            onChange={changeHandler}
            disabled={loading}
          />

          <input
            className="w-full bg-transparent text-white placeholder:text-gray-300 outline-none border-b-2 border-gray-400 focus:border-green-500 rounded-none px-4 py-3 transition-all"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={signupDetails.email}
            onChange={changeHandler}
            disabled={loading}
          />

          <div className="w-full relative">
            <input
              className="w-full bg-transparent text-white placeholder:text-gray-300 outline-none border-b-2 border-gray-400 focus:border-green-500 rounded-none px-4 py-3 transition-all pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={signupDetails.password}
              onChange={changeHandler}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-500 hover:text-white"
              aria-label="Toggle Password Visibility"
              disabled={loading}
            >
              {showPassword ? (
                <BiSolidShow size={20} />
              ) : (
                <BiSolidHide size={20} />
              )}
            </button>
          </div>

          <div className="w-full relative">
            <input
              className="w-full bg-transparent text-white placeholder:text-gray-300 outline-none border-b-2 border-gray-400 focus:border-green-500 rounded-none px-4 py-3 transition-all pr-10"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              name="confirmPassword"
              value={signupDetails.confirmPassword}
              onChange={changeHandler}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-500 hover:text-white"
              aria-label="Toggle Confirm Password Visibility"
              disabled={loading}
            >
              {showConfirmPassword ? (
                <BiSolidShow size={20} />
              ) : (
                <BiSolidHide size={20} />
              )}
            </button>
          </div>

          {otpGenerated && (
            <input
              className="w-full bg-transparent text-white placeholder:text-gray-300 outline-none border-b-2 border-gray-400 focus:border-green-500 rounded-none px-4 py-3 transition-all"
              type="text"
              placeholder="Enter 6-digit OTP"
              name="otp"
              value={signupDetails.otp}
              onChange={changeHandler}
              disabled={loading}
            />
          )}

          {otpGenerated ? (
            <button
              onClick={signupHandler}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition-all mt-4 shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              Signup
            </button>
          ) : (
            <button
              type="button"
              onClick={otpHandler}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition-all mt-4 shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              Generate OTP
            </button>
          )}

          {otpGenerated && (
            <button
              type="button"
              onClick={otpHandler}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition-all mt-4 shadow-lg hover:shadow-xl"
              disabled={loading}
            >
              Resend OTP
            </button>
          )}

          <div className="mt-4">
            <NavLink
              to="/login"
              className="text-green-500 hover:text-white font-semibold"
            >
              Already have an account? Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
