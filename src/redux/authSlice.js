import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice;
