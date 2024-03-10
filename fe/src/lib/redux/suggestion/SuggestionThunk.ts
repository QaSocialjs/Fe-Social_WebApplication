import { ApiClient } from "@lib/services/ApiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const suggestionUser = createAsyncThunk(
  "suggestionUser",
  async (values: "", thunkAPI) => {
    const response: any = await ApiClient.instance.get("/suggestion", {
      credentials: "include",
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
