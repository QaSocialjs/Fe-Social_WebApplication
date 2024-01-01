import { createSlice } from "@reduxjs/toolkit";
import { Login, Signup } from "./UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { Ok, ResultAsync } from "neverthrow";

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
interface UserState {
  loading: boolean;
  errors: {
    message: string;
    XErrorType: string;
  } | null;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  errors: {
    message: "",
    XErrorType: "",
  },
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
        state.errors = null;
        state.success = true;
      })
      .addCase(Login.rejected, (state, action) => {
        const result = action.payload as Ok<
          Response,
          void | Error | ApiError | ResultAsync<never, ApiError>
        >;
        if (result.isErr() && result.error instanceof ApiError) {
          const apiError = result.error as ApiError;

          state.errors = {
            message: apiError.details.errors?.message!,
            XErrorType: apiError.details.errors?.XErrorType!,
          };
        }
        state.loading = false;
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
        const result = action.payload as Ok<
          Response,
          void | Error | ApiError | ResultAsync<never, ApiError>
        >;
        if (result.isErr() && result.error instanceof ApiError) {
          const apiError = result.error as ApiError;

          state.errors = {
            message: apiError.details.errors?.message!,
            XErrorType: apiError.details.errors?.XErrorType!,
          };
        }
      });
  },
  reducers: {},
});

export default UserSlice;
