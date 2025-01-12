import { MdDelete } from "react-icons/md";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLanguage } from "../../slices/languageSlice.js";
import { showLoader } from "../../slices/loaderSlice.js";
import { toast } from "react-hot-toast";
import axios from "axios";

function MyLanguages() {
  const reduxLanguages = useSelector((state) => state.languages.value);
  const dispatch = useDispatch();

  const [languages, setLanguages] = useState(reduxLanguages);

  const addLanguageHandler = () => {
    const newLanguage = prompt("Enter a new language:");

    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
    } else if (languages.includes(newLanguage)) {
      toast.error("Language already exists");
    }
  };

  const removeLanguageHandler = (index) => {
    setLanguages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const saveHandler = async () => {
    try {
      dispatch(showLoader(true));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/save-languages`,
        languages,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(showLoader(false));
        dispatch(addLanguage(languages));
        toast.success("Languages saved successfully");
      }
    } catch (error) {
      dispatch(showLoader(false));
      toast.error(error.response?.data?.message || "An  error occurred");
    }
  };
  return (
    <div className="w-full border-b border-green-600 pb-4 px-4 sm:px-0 flex flex-col">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Languages</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.isArray(languages) ? (
          languages.map((language, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-green-100 border border-green-600 p-2 rounded shadow"
            >
              <span className="font-medium">{language}</span>
              <button
                className="ml-2"
                onClick={() => removeLanguageHandler(index)}
              >
                <MdDelete className="text-2xl text-slate-600 hover:text-slate-700" />
              </button>
            </div>
          ))
        ) : (
          <p>No languages available, add your languages.</p>
        )}
      </div>
      <button
        className="mt-4 bg-slate-600 text-white text-center font-bold px-4 py-2 rounded hover:bg-slate-700 sm:w-[15%] w-full"
        onClick={addLanguageHandler}
      >
        Add
      </button>

      <button
        onClick={saveHandler}
        className="mt-4 bg-green-600 text-white font-bold text-center px-4 py-2 rounded hover:bg-green-700 sm:w-[15%] w-full"
      >
        Save
      </button>
    </div>
  );
}

export default MyLanguages;
