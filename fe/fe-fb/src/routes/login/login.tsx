import classes from "./login.module.css";
import Formlogin from "./formlogin";
import Icon from "../../components/Icon/Icon";
import { useFormik } from "formik";
import axios from "axios";
import validationSchema from "../../lib/schemaforLogin";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { loginUser } from "../../store/auth/auth";

interface formikIn {
  email: string;
  password: string;
}
function Login() {
  const navigate = useNavigate();
  const { loginStatus } = useSelector((state: any) => state.auth);
  const { loginLoading } = useSelector((state: any) => state.auth);
  const { loginError } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const formik = useFormik<formikIn>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.defaults.withCredentials = true;
      dispatch(loginUser(values));
    },
  });
  useEffect(() => {
    if (loginStatus === "Login successfully") {
      navigate("/Dashboard");
    }
  }, [loginStatus]);
  return (
    <div className={classes.login}>
      <div className={classes.title}>
        <Icon icon="CubeIcon"></Icon>
        <p className={classes.subtitle}>Sign in to C.M.RAP</p>
      </div>
      <Formlogin
        formik={formik}
        err={loginError}
        statement={loginLoading}
      ></Formlogin>
    </div>
  );
}

export default Login;
//
