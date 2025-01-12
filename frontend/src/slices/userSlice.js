import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photo: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  linkedin: "",
  github: "",
  dob: "",
  gender: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (state.hasOwnProperty(key)) {
          state[key] = value;
        }
      });
    },
    resetUser: () => initialState,
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
