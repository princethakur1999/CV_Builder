import ImageSlider from "../components/Home/ImageSlider";
import Steps from "../components/Home/Steps";
import Feature from "../components/Home/Feature";
import Feedback from "../components/Home/Feedback";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../slices/userSlice.js";
import { addEducation } from "../slices/educationSlice.js";
import { addSkill } from "../slices/skillSlice.js";
import { addProject } from "../slices/projectSlice.js";
import { addLanguage } from "../slices/languageSlice.js";
function Home() {
  const dispatch = useDispatch();

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        document.title = "Home";

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-user-data`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response?.data?.success) {
          const personalDetails = {
            photo:
              response.data.user.resumeData?.photo ||
              "https://encrpted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy-evO2zspn-hP-gDQ706gy8ePig09CjnVF_xHUQtWIp-TZQPD521LntlCgnhlhmcYFAo&usqp=CAU",
            firstName: response.data.user?.firstName || "",
            lastName: response.data.user?.lastName || "",
            email: response.data.user?.email || "",
            phone: response.data.user.resumeData?.phone || "",
            country: response.data.user.resumeData?.country || "",
            state: response.data.user.resumeData?.state || "",
            linkedin: response.data.user.resumeData?.linkedin || "",
            github: response.data.user.resumeData?.github || "",
            dob: response.data.user.resumeData?.dob || "",
            gender: response.data.user.resumeData?.gender || "",
          };

          // Dispatching actions to store in Redux state
          dispatch(updateUser(personalDetails));

          if (response.data.user?.resumeData?.education.length > 0) {
            dispatch(addEducation(response.data.user.resumeData.education));
          }
          if (response.data.user?.resumeData?.skills) {
            dispatch(addSkill(response.data.user.resumeData.skills));
          }
          if (response.data.user?.resumeData?.projects) {
            dispatch(addProject(response.data.user.resumeData.projects));
          }
          if (response.data.user?.resumeData?.languages) {
            dispatch(addLanguage(response.data.user.resumeData.languages));
          }
        }
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error.message
        );
      }
    };

    if (localStorage.getItem("token")) {
      fetchUserData();
    }
  }, [dispatch]);
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center gap-6">
      <ImageSlider />

      <Steps />

      <Feature />

      <Feedback />
    </div>
  );
}

export default Home;
