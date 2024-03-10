import { ApiClient } from "@lib/services/ApiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const AcceptFriendRequestFriend = createAsyncThunk(
  "friend/AcceptFriend",
  async (
    values: {
      curUserId: string;
      idReq: string;
    },
    thunkAPI
  ) => {
    const response = await ApiClient.instance.put(
      `/acceptFriend/${values.curUserId}`,
      {
        body: {
          idReq: values.idReq,
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
