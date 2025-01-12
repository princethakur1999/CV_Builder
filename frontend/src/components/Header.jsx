import { NavLink, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoLogOut, IoDocumentTextSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetUser } from "../slices/userSlice.js";
import { resetEducation } from "../slices/educationSlice.js";
import { resetSkill } from "../slices/skillSlice.js";
import { resetProject } from "../slices/projectSlice.js";
import { resetLanguage } from "../slices/languageSlice.js";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");

    dispatch(resetUser());
    dispatch(resetEducation());
    dispatch(resetSkill());
    dispatch(resetProject());
    dispatch(resetLanguage());

    navigate("/login");

    toast.success("Logged out successfully");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 w-full h-auto px-4 py-2 bg-green-600 flex justify-between items-center gap-4 text-white font-bold">
      <NavLink
        to="/"
        className="text-4xl flex justify-between items-center gap-2"
      >
        <IoDocumentTextSharp />
        <span className="text-lg sm:text-2xl">CV Builder</span>
      </NavLink>

      <div className="w-auto flex justify-between items-center gap-4">
        {!token && <NavLink to="/signup">Signup</NavLink>}
        {!token && <NavLink to="/login">Login</NavLink>}

        {token && (
          <>
            <NavLink className="grid items-center text-4xl" to="/account">
              <MdAccountCircle />
            </NavLink>

            <button
              onClick={logoutHandler}
              className="grid items-center text-3xl"
              aria-label="Logout"
            >
              <IoLogOut />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
