import ProgressBar from "../components/Account/ProgressBar";
import PersonalDetails from "../components/Account/PersonalDetails";
import EducationDetails from "../components/Account/EducationDetails";
import MySkills from "../components/Account/MySkills";
import MyProjects from "../components/Account/MyProjects";
import MyLanguages from "../components/Account/MyLanguages";
import checkTokenExpiry from "../utils/checkTokenExpiry.js";
import { useEffect } from "react";

const Account = () => {
  checkTokenExpiry();

  useEffect(() => {
    document.title = "Account";
  }, []);
  return (
    <div className="max-w-7xl p-6 flex flex-col items-center gap-12">
      <ProgressBar />
      <PersonalDetails />
      <EducationDetails />
      <MySkills />
      <MyProjects />
      <MyLanguages />
    </div>
  );
};

export default Account;
