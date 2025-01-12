import express from "express";

const router = express.Router();

import {
  savePhoto,
  savePersonalDetails,
  saveEducationDetails,
  saveSkills,
  saveProjects,
  saveLanguages,
  getUserData,
} from "../controllers/userDataController.js";

router.post("/save-photo", savePhoto);
router.post("/save-personal-details", savePersonalDetails);
router.post("/save-education-details", saveEducationDetails);
router.post("/save-skills", saveSkills);
router.post("/save-projects", saveProjects);
router.post("/save-languages", saveLanguages);

router.get("/get-user-data", getUserData);

export default router;
