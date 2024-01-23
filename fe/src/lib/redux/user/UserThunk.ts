import { User } from "@lib/models/User";
import { ApiClient } from "@lib/services/ApiClient";
import { JsonPatch } from "@lib/utils/service.assetInfo";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface values extends User {
  confirmpassword: string;
}
interface updateValues
  extends Omit<
    User,
    "firstName" | "lastName" | "age" | "id" | "email" | "password"
  > {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  age?: string;
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
    const response: any = await ApiClient.instance.get("/getuser", {
      credentials: "include",
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
export const getUserId = createAsyncThunk(
  "user/getUserId",
  async (values: { id: string }, thunkAPI) => {
    const response = await ApiClient.instance.get(`/getuser/${values.id}`, {
      credentials: "include",
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
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
export const RequestImg = createAsyncThunk(
  "user/requestimg",
  async (values: { id: string }, thunkAPI) => {
    const response = await ApiClient.instance.post(
      `/upload/${values.id}/avatar`,
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

export const PatchAvatarUser = createAsyncThunk(
  "user/patchAvatarUser",
  async (values: { patch: JsonPatch; id: string }, thunkAPI) => {
    const response = await ApiClient.instance.patch("/patchAvatarUser", {
      body: {
        id: values.id,
        patch: values.patch.jsonpatch,
      },
      credentials: "include",
    });
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);

export const UpdateUser = createAsyncThunk(
  "user/updateUser",
  async (values: updateValues, thunkAPI) => {
    const response = await ApiClient.instance.put(`/updateUser/${values.id}`, {
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

export const DeleteCityUser = createAsyncThunk(
  "user/deleteCityUser",
  async (values: updateValues, thunkAPI) => {
    const response = await ApiClient.instance.delete(
      `/deleteCity/${values.id}`,
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

export const CreatWork = createAsyncThunk(
  "user/createWork",
  async (values: updateValues, thunkAPI) => {
    const response = await ApiClient.instance.post(
      `/createUserWork/${values.id}`,
      {
        body: {
          ...values,
        },
      }
    );
    if (response.isErr()) {
      return thunkAPI.rejectWithValue(response);
    }
    return thunkAPI.fulfillWithValue(response);
  }
);
