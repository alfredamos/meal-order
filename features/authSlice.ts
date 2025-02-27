import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../models/authState";
import { Role, User } from ".prisma/client";
import { AuthResponseModel } from "../models/authResponse.model"


const initialState: AuthState = {
  isLoggedIn: false,
  isAdmin: false,
  currentUser: new AuthResponseModel(),
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.user.role === Role.Admin;

    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.token = null;

    },
  },
});

export const { login, logout } =
  authSlice.actions;
export default authSlice.reducer;
