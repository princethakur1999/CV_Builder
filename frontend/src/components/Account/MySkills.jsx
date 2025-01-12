import { MdDelete } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { addSkill } from "../../slices/skillSlice.js";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { showLoader } from "../../slices/loaderSlice.js";

function MySkills() {
  // Access the value of skills from Redux store
  const reduxSkills = useSelector((state) => state.skills.value);
  const dispatch = useDispatch();

  // Set initial skills from Redux state when the component mounts
  const [skills, setSkills] = useState(reduxSkills);

  const addSkillHandler = () => {
    const newSkill = prompt("Enter a new skill:");

    if (newSkill && !skills.includes(newSkill)) {
      setSkills((prev) => [...prev, newSkill]);
    } else if (skills.includes(newSkill)) {
      toast.error("This skill is already in the list!");
    }
  };

  const removeSkillHandler = (index) => {
    setSkills((prev) => prev.filter((_, idx) => idx !== index));
  };

  const saveHandler = async () => {
    try {
      dispatch(showLoader(true));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/save-skills`,
        skills,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(showLoader(false));
        dispatch(addSkill(response.data.skills));
        toast.success("Skills saved successfully!");
      }
    } catch (error) {
      dispatch(showLoader(false));
      toast.error(error.response?.data?.message || "An  error occurred");
    }
  };

  return (
    <div className="w-full border-b border-green-600 pb-4 px-4 sm:px-0 flex flex-col">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Only render if skills is an array */}
        {Array.isArray(skills) ? (
          skills.map((skill, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-green-100 border border-green-600 p-2 rounded shadow"
            >
              <span className="font-medium">{skill}</span>
              <button
                className="ml-2"
                onClick={() => removeSkillHandler(index)}
              >
                <MdDelete className="text-2xl text-slate-600 hover:text-slate-700" />
              </button>
            </div>
          ))
        ) : (
          <p>No skills available, add your skills.</p>
        )}
      </div>

      <button
        className="mt-4 bg-slate-600 text-white text-center font-bold px-4 py-2 rounded hover:bg-slate-700 sm:w-[15%] w-full"
        onClick={addSkillHandler}
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

export default MySkills;
