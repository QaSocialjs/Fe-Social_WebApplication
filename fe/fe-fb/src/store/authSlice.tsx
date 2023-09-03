import { createSlice } from "@reduxjs/toolkit";
import { loginUser, refreshTokenAction, registerUser } from "./auth/auth";

const initialState = {
  user: null,
  accesstoken: "",
  refreshtoken: "",
  registerStatus: "",
  registerLoading: false,
  registerError: "",
  loginStatus: "asdsd",
  loginLoading: false,
  loginError: "",
  userLoading: false,
};

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Logout: (state) => {
      state.user = null;
      state.accesstoken = "";
      state.refreshtoken = "";
      state.loginStatus = "";
      state.loginLoading = false;
      state.loginError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state: any) => {
      state.registerLoading = true;
      state.registerError = "";
    });
    builder.addCase(registerUser.fulfilled, (state: any, { payload }) => {
      state.registerLoading = false;
      state.registerStatus = payload;
    });
    builder.addCase(registerUser.rejected, (state: any, { payload }) => {
      state.registerLoading = false;
      state.registerError = payload;
    });
    builder.addCase(loginUser.pending, (state: any) => {
      state.loginLoading = true;
      state.loginError = "";
    });
    builder.addCase(loginUser.fulfilled, (state: any, actions) => {
      state.user = actions.payload.data;
      state.accesstoken = actions.payload.accesstoken;
      state.refreshtoken = actions.payload.refreshtoken;
      state.loginLoading = false;
      state.loginStatus = actions.payload.status;
    });
    builder.addCase(loginUser.rejected, (state: any, { payload }) => {
      state.loginLoading = false;
      state.loginError = payload;
    });
    builder.addCase(refreshTokenAction.fulfilled, (state, action) => {
      state.accesstoken = action.payload.accesstoken;
      state.refreshtoken = action.payload.refreshtoken;
    });
  },
});

export const { Logout } = authSlice.actions;
export default authSlice.reducer;
