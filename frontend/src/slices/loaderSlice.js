import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader(state, action) {
      state.value = action.payload;
    },
  },
});

export const { showLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
