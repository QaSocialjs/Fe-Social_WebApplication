import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Interceptor from "../lib/RefreshToken";

type Props = {
  children: ReactNode;
};
const VerifyToken = (props: Props) => {
  const { accesstoken } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const axiosJWT = axios.create();
  Interceptor(axiosJWT);
  useEffect(() => {
    console.log(accesstoken);
    axios.defaults.withCredentials = true;
    axiosJWT
      .get("http://localhost:3000/api/v1/Home", {
        headers: {
          Authorization: "Bearer " + accesstoken,
        },
      })
      .catch((e) => {
        navigate("/Error/403");
      });
  }, [accesstoken]);
  return <div>{props.children}</div>;
};

export default VerifyToken;
