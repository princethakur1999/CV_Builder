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

import { authenticateUser } from "./middlewares/authMiddleware.js";

router.post("/save-photo", authenticateUser, savePhoto);
router.post("/save-personal-details", authenticateUser, savePersonalDetails);
router.post("/save-education-details", authenticateUser, saveEducationDetails);
router.post("/save-skills", authenticateUser, saveSkills);
router.post("/save-projects", authenticateUser, saveProjects);
router.post("/save-languages", authenticateUser, saveLanguages);

router.get("/get-user-data", authenticateUser, getUserData);

export default router;
