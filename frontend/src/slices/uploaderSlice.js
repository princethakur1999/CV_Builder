import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {
    showUploader(state, action) {
      state.value = action.payload;
    },
  },
});

export const { showUploader } = uploaderSlice.actions;

export default uploaderSlice.reducer;
