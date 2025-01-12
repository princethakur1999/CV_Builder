import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.value = action.payload;
    },
    resetProject: () => initialState,
  },
});

export const { addProject, resetProject } = projectSlice.actions;

export default projectSlice.reducer;
