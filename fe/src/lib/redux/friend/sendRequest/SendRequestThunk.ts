import { ApiClient } from "@lib/services/ApiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const SendRequestFriend = createAsyncThunk(
  "friend/sendRqFriend",
  async (
    values: {
      curUserId: string;
      userRq: string;
    },
    thunkAPI
  ) => {
    const response = await ApiClient.instance.post(
      `/createReqFriend/${values.curUserId}`,
      {
        body: {
          idFriend: values.userRq,
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
