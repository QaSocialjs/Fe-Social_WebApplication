import { User } from "@lib/models/User";
import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { Login, Signup } from "./UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { NavigationType } from "react-router";

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
interface UserState {
  user: User | null;
  loading: boolean;
  errors: ApiError | null;
  success: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  errors: null,
  success: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(Login.pending, (state) => {
        state.success = false;
        state.errors = null;
        state.loading = true;
      })
      .addCase(Login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(Login.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.errors = action.payload as ApiError;
        console.log(state.errors);
      })
      .addCase(Signup.pending, (state) => {
        state.success = false;
        state.errors = null;
        state.loading = true;
      })
      .addCase(Signup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(Signup.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as ApiError;
      });
  },
  reducers: {},
});

export default UserSlice;
