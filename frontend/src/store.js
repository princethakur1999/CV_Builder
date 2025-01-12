import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice.js";
import edcationReducer from "./slices/educationSlice.js";
import skillReducer from "./slices/skillSlice.js";
import projectReducer from "./slices/projectSlice.js";
import languageReducer from "./slices/languageSlice.js";
import loaderReducer from "./slices/loaderSlice.js";
import uploaderSlice from "./slices/uploaderSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    education: edcationReducer,
    skills: skillReducer,
    projects: projectReducer,
    languages: languageReducer,
    loader: loaderReducer,
    uploader: uploaderSlice,
  },
});
