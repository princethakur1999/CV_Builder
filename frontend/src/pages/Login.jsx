import { useState, useEffect } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";
function Login() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/account" replace />;
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (!loginDetails.email || !loginDetails.password) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        loginDetails
      );

      if (response.data.success) {
        setLoading(false);

        toast.success("Login successful");

        localStorage.setItem("token", response.data.token);

        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);

      toast.error(error.response?.data?.message || "Please try again.");
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      {loading && <Loader />}
      <div className="bg-opacity-30 backdrop-blur-md bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-8 rounded-xl shadow-xl w-[90%] md:w-[50%] lg:w-[35%] flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-green-500">Login</h1>

        <form
          onSubmit={loginHandler}
          className="w-full flex flex-col items-center gap-4"
        >
          <input
            className="w-full bg-transparent text-white placeholder:text-gray-300 outline-none border-b-2 border-gray-400 focus:border-green-500 rounded-none px-4 py-3 transition-all"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={loginDetails.email}
            onChange={changeHandler}
            disabled={loading}
          />

          <div className="w-full relative">
            <input
              className="w-full bg-transparent text-white placeholder:text-gray-300 outline-none border-b-2 border-gray-400 focus:border-green-500 rounded-none px-4 py-3 transition-all pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={loginDetails.password}
              onChange={changeHandler}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-500 hover:text-white"
              aria-label={showPassword ? "Hide Password" : "Show Password"}
              disabled={loading}
            >
              {showPassword ? (
                <BiSolidShow size={20} />
              ) : (
                <BiSolidHide size={20} />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition-all mt-4 shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            Login
          </button>

          <div className="mt-4">
            <NavLink
              to="/signup"
              className="text-green-500 hover:text-white font-semibold"
            >
              Don't have an account? Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
