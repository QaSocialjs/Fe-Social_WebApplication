import { ApiClient } from "@lib/services/ApiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const CheckIsFriend = createAsyncThunk(
  "friend/checkIsfriend",
  async (
    values: {
      curUserId: string;
      idFr: string;
    },
    thunkAPI
  ) => {
    const response = await ApiClient.instance.put(
      `/checkFriend/${values.curUserId}`,
      {
        body: {
          idFr: values.idFr,
        },
        credentials: "include",
      }
    );
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
