import { ApiClient } from "@lib/services/ApiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetSendRequestFriend = createAsyncThunk(
  "friend/getsendRqFriend",
  async (
    values: {
      curUserId: string;
    },
    thunkAPI
  ) => {
    const response = await ApiClient.instance.get(
      `/getFriendRequest/${values.curUserId}`,
      {
        credentials: "include",
      }
    );
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
