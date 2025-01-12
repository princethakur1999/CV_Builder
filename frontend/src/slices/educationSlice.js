import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      qualification: "10th",
      board: "null",
      percentage: "null",
      year: "null",
    },
    {
      qualification: "12th",
      board: "null",
      percentage: "null",
      year: "null",
    },
    {
      qualification: "Bachelor",
      board: "null",
      percentage: "nul",
      year: "null",
    },
    {
      qualification: "Master",
      board: "null",
      percentage: "null",
      year: "null",
    },
  ],
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    addEducation: (state, action) => {
      state.value = action.payload;
    },
    resetEducation: () => initialState,
  },
});

export const { addEducation, resetEducation } = educationSlice.actions;

export default educationSlice.reducer;
