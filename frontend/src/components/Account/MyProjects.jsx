import { MdDelete } from "react-icons/md";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "../../slices/projectSlice.js";
import { toast } from "react-hot-toast";
import axios from "axios";
import { showLoader } from "../../slices/loaderSlice.js";

function MyProjects() {
  const reduxProjects = useSelector((state) => state.projects).value;
  const dispatch = useDispatch();

  const [projects, setProjects] = useState(reduxProjects);

  const addProjectHandler = () => {
    const name = prompt("Enter project name:");
    const description = prompt("Enter project description:");
    const link = prompt("Enter project link:");

    if (name && description && link) {
      setProjects((prev) => [...prev, { name, description, link }]);
    } else {
      toast.error("Please fill all fields");
    }
  };

  const removeProjectHandler = (index) => {
    setProjects((prev) => prev.filter((_, idx) => idx !== index));
  };

  const saveHandler = async () => {
    try {
      dispatch(showLoader(true));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/save-projects`,
        projects,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(showLoader(false));
        dispatch(addProject(response.data.projects));
        toast.success("Projects saved successfully!");
      }
    } catch (error) {
      dispatch(showLoader(false));
      toast.error(error.response?.data?.message || "An  error occurred");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto border-b border-green-600 pb-4 px-4 sm:px-0 flex flex-col">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Projects</h2>
      <div className="space-y-4">
        {Array.isArray(projects) ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center bg-green-100 p-4 rounded shadow"
            >
              <div className="flex justify-between w-full mb-2">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="font-bold underline">{project.link}</p>
              </div>
              <p className=" text-justify">{project.description}</p>
              <button
                className="text-slate-600 hover:text-slate-700 w-full mt-2 flex flex-row-reverse "
                onClick={() => removeProjectHandler(index)}
              >
                <MdDelete className="text-2xl font-bold" />
              </button>
            </div>
          ))
        ) : (
          <p>No projects available, add your projects.</p>
        )}
      </div>
      <button
        className="mt-4 bg-slate-600 text-white text-center font-bold px-4 py-2 rounded hover:bg-slate-700 sm:w-[15%] w-full"
        onClick={addProjectHandler}
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

export default MyProjects;
