import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    addLanguage: (state, action) => {
      state.value = action.payload;
    },
    resetLanguage: () => initialState,
  },
});

export const { addLanguage, resetLanguage } = languageSlice.actions;

export default languageSlice.reducer;
