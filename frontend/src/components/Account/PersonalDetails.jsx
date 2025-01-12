import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../slices/userSlice.js";
import { showLoader } from "../../slices/loaderSlice.js";
import { showUploader } from "../../slices/uploaderSlice.js";
import { toast } from "react-hot-toast";
import axios from "axios";
import PhotoUploader from "./PhotoUploader.jsx";

function PersonalDetails() {
  const reduxUser = useSelector((state) => state.user);
  const uploader = useSelector((state) => state.uploader.value);

  const dispatch = useDispatch();

  // Initialize local state from Redux state
  const [userData, setUserData] = useState({
    photo: reduxUser.photo,
    firstName: reduxUser.firstName,
    lastName: reduxUser.lastName,
    email: reduxUser.email,
    phone: reduxUser.phone,
    country: reduxUser.country,
    state: reduxUser.state,
    linkedin: reduxUser.linkedin,
    github: reduxUser.github,
    dob: reduxUser.dob,
    gender: reduxUser.gender,
  });

  const photoUpload = () => {
    dispatch(showUploader(true));
  };

  const changePersonalDetails = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      dispatch(showLoader(true));
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/save-personal-details`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(showLoader(false));
        dispatch(updateUser(response.data.data));
        toast.success("Personal details updated successfully");
      }
    } catch (error) {
      dispatch(showLoader(false));
      toast.error(error.response?.data?.message || "An  error occurred");
      console.error(error.response?.data?.message);
    }
  };

  if (uploader) {
    return <PhotoUploader />;
  }

  return (
    <div className="w-full grid grid-cols-1 gap-6 border-b border-green-600 pb-4 px-4 sm:px-0">
      <div className="w-full flex flex-col justify-center items-center border-b border-green-600 pb-4">
        <div className="relative bg-white rounded-full p-2 h-[120px] w-[120px] mb-4 sm:mb-0">
          <img
            className="h-full w-full rounded-full object-cover"
            src={userData.photo}
            alt="User"
          />
          <IoMdAddCircle
            onClick={photoUpload}
            className="absolute bottom-0 right-0 text-4xl text-green-600 cursor-pointer"
          />
        </div>
      </div>
      {[
        {
          label: "First Name",
          name: "firstName",
          type: "text",
        },
        {
          label: "Last Name",
          name: "lastName",
          type: "text",
        },
        {
          label: "Email",
          name: "email",
          type: "email",
          readonly: true,
        },
        {
          label: "Phone",
          name: "phone",
          type: "tel",
        },
        {
          label: "Country",
          name: "country",
          type: "text",
        },
        {
          label: "State",
          name: "state",
          type: "text",
        },
        {
          label: "Linkedin",
          name: "linkedin",
          type: "url",
          placeholder: "https://www.linkedin.com/in/",
        },
        {
          label: "Github",
          name: "github",
          type: "url",
          placeholder: "https://github.com/",
        },
        {
          label: "Date of Birth",
          name: "dob",
          type: "date",
        },
      ].map(({ label, name, type, placeholder, readonly }) => (
        <div className="w-full" key={name}>
          <label
            htmlFor={name}
            className="block mb-1 font-semibold text-sm sm:text-base"
          >
            {label}
          </label>
          <input
            id={name}
            className={`outline-none p-2 w-full border rounded-md text-sm sm:text-base ${
              readonly ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            }`}
            type={type}
            name={name}
            value={
              name === "dob" && userData[name]
                ? new Date(userData[name]).toISOString().split("T")[0]
                : userData[name] || ""
            }
            placeholder={placeholder || ""}
            onChange={changePersonalDetails}
            readOnly={readonly || false}
          />
        </div>
      ))}

      <div className="w-full">
        <label className="block mb-1 font-semibold text-sm sm:text-base">
          Gender
        </label>
        <div className="flex gap-4 bg-white p-2">
          {["Male", "Female", "Others"].map((gender) => (
            <div key={gender} className="flex items-center gap-2">
              <input
                id={`gender-${gender}`}
                type="radio"
                name="gender"
                value={gender}
                checked={userData.gender === gender}
                onChange={changePersonalDetails}
              />
              <label
                htmlFor={`gender-${gender}`}
                className="text-sm sm:text-base"
              >
                {gender}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <button
          onClick={handleSave}
          className="mt-4 bg-green-600 text-white font-bold text-center px-4 py-2 rounded hover:bg-green-700 sm:w-[15%] w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PersonalDetails;
