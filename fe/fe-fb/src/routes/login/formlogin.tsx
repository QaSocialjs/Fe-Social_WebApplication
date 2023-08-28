import React, { Suspense } from "react";
import classes from "./formlogin.module.css";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
const Formlogin = (props: any) => {
  return (
    <div className={classes.box}>
      <div className={classes.loader}>
        {props.statement ? <PacmanLoader color="#36d7b7" size={12} /> : ""}
      </div>
      <form className={classes.form} onSubmit={props.formik.handleSubmit}>
        <div className={classes.inputs}>
          <Input
            label="Email address"
            input={{
              id: "email",
              type: "text",
              name: "email",
              value: props.formik.values.email,
              onChange: props.formik.handleChange,
            }}
            touched={props.formik.touched.email}
            error={props.formik.errors.email}
            message={props.formik.errors.email}
          ></Input>
          <Input
            label="Password"
            input={{
              id: "Password",
              type: "password",
              name: "password",
              value: props.formik.values.password,
              onChange: props.formik.handleChange,
            }}
            touched={props.formik.touched.password}
            error={props.formik.errors.password}
            message={props.formik.errors.password}
          ></Input>
        </div>
        <button className={classes.button} type="submit">
          Sign in
        </button>
      </form>
      <div className={classes.routeToSignup}>
        <p>
          New to C.M.RAP?{" "}
          <Link className={classes.link} to={"Signup"}>
            Create an Account
          </Link>
          .
        </p>
      </div>
      {props.err !== "" ? (
        <div className={classes.err}>
          <p>{props.err}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Formlogin;
