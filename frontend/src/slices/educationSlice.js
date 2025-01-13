import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
    {
      qualification: "10th",
      board: "-",
      percentage: "-",
      year: "-",
    },
    {
      qualification: "12th",
      board: "-",
      percentage: "-",
      year: "-",
    },
    {
      qualification: "Bachelor",
      board: "-",
      percentage: "-",
      year: "-",
    },
    {
      qualification: "Master",
      board: "-",
      percentage: "-",
      year: "-",
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
