import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "./AuthContext";
import { refreshTokenAction } from "../store/auth/auth";
import { ThunkDispatch } from "@reduxjs/toolkit";

const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const refreshToken = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);

  const [refreshing, setRefreshing] = useState(false);

  const refreshAccessToken = () => {
    if (!refreshing) {
      setRefreshing(true);
      dispatch(refreshTokenAction({ refreshToken, user }));
      setRefreshing(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (refreshToken !== "") {
        refreshAccessToken();
      }
    }, 20 * 1000);

    return () => clearInterval(interval);
  }, [refreshAccessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
