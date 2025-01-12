import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEducation } from "../../slices/educationSlice";
import { showLoader } from "../../slices/loaderSlice.js";
import { toast } from "react-hot-toast";
import axios from "axios";

function EducationDetails() {
  const dispatch = useDispatch();

  // Get initial education data from Redux
  const reduxEducation = useSelector((state) => state.education.value);

  // Local state for managing education details
  const [education, setEducation] = useState(reduxEducation);

  // Handler to update local state
  const changeEducationDetails = (index, field, value) => {
    setEducation((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      )
    );
  };
  const isValidEducation = (education) => {
    if (education.length !== 4) {
      return false;
    }

    // Check if all elements are objects and have exactly 3 properties
    return education.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        Object.keys(item).length === 3
    );
  };

  const saveHandler = async () => {
    try {
      dispatch(showLoader(true));

      if (!isValidEducation(education)) {
        toast.error("Fill in all the education fields.");
        dispatch(showLoader(false));
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/save-education-details`,
        education,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(showLoader(false));

        if (response?.data?.education.length > 0) {
          dispatch(addEducation(response.data.education));
        }

        toast.success("Education details saved successfully");
      }
    } catch (error) {
      dispatch(showLoader(false));
      toast.error(error.response?.data?.message || "An  error occurred");
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full border-b border-green-600 flex flex-col gap-4 pb-4 px-4 sm:px-0">
      <h2 className="text-2xl font-bold text-green-600">Education Details</h2>

      <table className="w-full border-collapse border border-green-600 text-center">
        <thead>
          <tr className="bg-green-300">
            <th className="border border-green-600 p-2 text-xs sm:text-base">
              Qualification
            </th>
            <th className="border border-green-600 p-2 text-xs sm:text-base">
              Board/University
            </th>
            <th className="border border-green-600 p-2 text-xs sm:text-base">
              Percentage
            </th>
            <th className="border border-green-600 p-2 text-xs sm:text-base">
              Year of Passing
            </th>
          </tr>
        </thead>
        <tbody>
          {education.map((edu, index) => (
            <tr key={index}>
              <td className="border border-green-600 p-2 text-xs sm:text-base">
                {edu.qualification}
              </td>
              <td className="border border-green-600 p-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded outline-none text-xs sm:text-base focus:border-green-600"
                  value={edu.board}
                  onChange={(e) =>
                    changeEducationDetails(index, "board", e.target.value)
                  }
                />
              </td>
              <td className="border border-green-600 p-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded outline-none text-xs sm:text-base focus:border-green-600"
                  value={edu.percentage}
                  onChange={(e) =>
                    changeEducationDetails(index, "percentage", e.target.value)
                  }
                />
              </td>
              <td className="border border-green-600 p-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded outline-none text-xs sm:text-base focus:border-green-600"
                  value={edu.year}
                  onChange={(e) =>
                    changeEducationDetails(index, "year", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full flex justify-start">
        <button
          onClick={saveHandler}
          className="mt-4 bg-green-600 text-white font-bold text-center px-4 py-2 rounded hover:bg-green-700 sm:w-[15%] w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EducationDetails;
