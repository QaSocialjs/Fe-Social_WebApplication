import classes from "./signup.module.css";
import Icon from "../../components/Icon";
import { useFormik } from "formik";
import validationSchema from "../../lib/schemaforSignup";
import axios from "axios";
import Formsignup from "./Formsignup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/auth/auth";
import { ThunkDispatch } from "@reduxjs/toolkit";

interface formikIn {
  email: string;
  password: string;
  confirmpassword: string;
}
function Signup() {
  const navigate = useNavigate();
  const { registerStatus } = useSelector((state: any) => state.auth);
  const { registerLoading } = useSelector((state: any) => state.auth);
  const { registerError } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const formik = useFormik<formikIn>({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      axios.defaults.withCredentials = true;
      dispatch(registerUser(values));
    },
  });
  return (
    <div className={classes.login}>
      <div className={classes.title}>
        <Icon icon="CubeIcon"></Icon>
        <p className={classes.subtitle}>Sign up to C.M.RAP</p>
      </div>
      <Formsignup
        formik={formik}
        success={registerStatus}
        statement={registerLoading}
        failure={registerError}
      ></Formsignup>
    </div>
  );
}

export default Signup;
