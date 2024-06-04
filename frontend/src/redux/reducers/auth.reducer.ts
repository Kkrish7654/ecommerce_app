import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userData = Cookies.get("userData");
const isAuthenticate = Cookies.get("isAuthenticate") === "true";

const initialState = {
  user: userData ? JSON.parse(userData) : null,
  isAuthenticate: isAuthenticate,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticate = true;
      state.user = action.payload;

      Cookies.set("userData", JSON.stringify(action.payload));
      Cookies.set("isAuthenticate", "true");
    },
    getLoginData: (state, action) => {
      state.user = action.payload;
      Cookies.get("userData");
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("userData");
      Cookies.remove("isAuthenticate");
      Cookies.remove("accesstoken");
    },
  },
});

export const { login, logout, getLoginData } = authSlice.actions;
export default authSlice.reducer;
