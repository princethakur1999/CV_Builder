import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    addSkill: (state, action) => {
      state.value = action.payload;
    },
    resetSkill: () => initialState,
  },
});

export const { addSkill, resetSkill } = skillSlice.actions;

export default skillSlice.reducer;
