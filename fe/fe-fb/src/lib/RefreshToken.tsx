import { RootState } from "../store/ConfigureStore";
import jwt_decode from "jwt-decode";
import { decodedToken } from "../utils/Interface_redux";
import { useDispatch, useSelector } from "react-redux";
import { refreshTokenAction } from "../store/auth/auth";
import { ThunkDispatch } from "@reduxjs/toolkit";

const Interceptor = (instance: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const auth = useSelector((state: RootState) => state.auth);
  const refreshToken = async () => {
    dispatch(refreshTokenAction(auth));
  };
  instance.interceptors.request.use(async (config: any) => {
    let currentDate = new Date();
    const decodedToken: decodedToken = jwt_decode(auth.accesstoken);
    if (decodedToken.exp * 1000 > currentDate.getTime()) {
      await refreshToken();
      console.log(auth.accesstoken);
      config.headers["Authorization"] = "Bearer " + auth.accesstoken;
    }
    return config;
  });
};

export default Interceptor;
