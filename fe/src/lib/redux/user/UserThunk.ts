import { ApiClient } from "@lib/services/ApiClient";
import { ApiError } from "@lib/services/ErrorApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

type values = {
  email: string;
  password: string;
  confirmpassword?: string;
};
export const Login = createAsyncThunk(
  "user/login",
  async (values: values, thunkAPI) => {
    console.log("adsa");
    const response = await ApiClient.instance.post("/login", {
      body: {
        email: values.email,
        password: values.password,
      },
    });
    console.log(response);
    if (response.isErr()) {
      const apiError = response.error as ApiError;
      return thunkAPI.rejectWithValue(apiError);
    }
    return response;
  }
);
export const Signup = createAsyncThunk(
  "user/signup",
  async (values: values, thunkAPI) => {
    const response = await ApiClient.instance.post("/signup", {
      body: {
        email: values.email,
        password: values.password,
        confirmpassword: values.confirmpassword,
      },
    });
    console.log(response);
    if (response.isErr()) {
      const apiError = response.error as ApiError;
      return thunkAPI.rejectWithValue(apiError);
    }
    return response;
  }
);
