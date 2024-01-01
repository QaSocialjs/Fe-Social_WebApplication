import { User } from "@lib/models/User";
import { ApiClient } from "@lib/services/ApiClient";
import { ApiError } from "@lib/services/ErrorApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface values extends User {
  confirmpassword: string;
}
export const Login = createAsyncThunk(
  "user/login",
  async (values: values, thunkAPI) => {
    const response = await ApiClient.instance.post("/login", {
      body: {
        email: values.email,
        password: values.password,
      },
      credentials: "include",
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
export const LoginEmailVerification = createAsyncThunk(
  "user/loginEmail",
  async (values: { email: string }, thunkAPI) => {
    const response = await ApiClient.instance.post("/login/emailVerification", {
      body: {
        email: values.email,
      },
      credentials: "include",
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
export const Signup = createAsyncThunk(
  "user/signup",
  async (values: values, thunkAPI) => {
    const response = await ApiClient.instance.post("/signup", {
      body: {
        ...values,
      },
      credentials: "include",
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
export const verifyAuthentication = createAsyncThunk(
  "user/verifyAuthentication",
  async (values: "", thunkAPI) => {
    const response = await ApiClient.instance.post("/verifyAuthentication", {
      credentials: "include",
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
export const getUser = createAsyncThunk(
  "user/getUser",
  async (values: "", thunkAPI) => {
    const response = await ApiClient.instance.get("/getUser", {
      credentials: "include",
    });
    if (response.isErr()) {
      const apiError = response.error as ApiError;
      return thunkAPI.rejectWithValue(apiError);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
export const checkCodeConfirm = createAsyncThunk(
  "user/checkCode",
  async (values: { codeConfirm: string; email: string }, thunkAPI) => {
    const response = await ApiClient.instance.put("/checkcode", {
      body: {
        codeConfirm: values.codeConfirm,
        email: values.email,
      },
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
export const SendMail = createAsyncThunk(
  "user/sendmail",
  async (values: { email: string }, thunkAPI) => {
    const response = await ApiClient.instance.post("/sendMailVerify", {
      body: {
        email: values.email,
      },
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
