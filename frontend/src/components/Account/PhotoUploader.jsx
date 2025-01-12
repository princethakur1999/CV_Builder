import { useState } from "react";
import { useDispatch } from "react-redux";
import { showUploader } from "../../slices/uploaderSlice.js";
import axios from "axios";
import toast from "react-hot-toast";

function PhotoUploader() {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("photo", photo);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/save-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setIsUploading(false);
        setPhoto("");
        dispatch(showUploader(false));
        toast.success("Photo uploaded successfully");
      }
    } catch (error) {
      setIsUploading(false);
      setPhoto("");
      dispatch(showUploader(false));
      toast.error(error.response?.data?.message || "An  error occurred");
    }
  };

  const cancelHandler = () => {
    dispatch(showUploader(false));
    setPhoto("");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Upload Photo
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              name="photo"
              id="photo"
              onChange={handlePhotoChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isUploading || !photo}
            className={`w-full py-2 px-4 text-white rounded-md ${
              isUploading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isUploading ? "Uploading..." : "Save"}
          </button>
        </form>
        <button
          onClick={cancelHandler}
          className="mt-4 w-full py-2 px-4 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default PhotoUploader;
