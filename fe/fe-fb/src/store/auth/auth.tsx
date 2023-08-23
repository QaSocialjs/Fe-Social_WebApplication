import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, refreshTokenApi, registerApi } from "../../api/api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (values: any, thunkApi) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(registerApi, {
        name: "",
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmpassword,
      });
      return (await response).data.status;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values: any, thunkApi) => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(loginApi, { values });
      return (await response).data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const refreshTokenAction = createAsyncThunk(
  "auth/refreshToken",
  async (values: any, thunkApi) => {
    try {
      axios.defaults.withCredentials = true;
      const response = axios.post(refreshTokenApi, {
        refreshToken: values.refreshtoken,
      });
      return (await response).data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
