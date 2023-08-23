import classes from "./formsignup.module.css";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
const Formsignup = (props: any) => {
  return (
    <div className={classes.box}>
      <div className={classes.loader}>
        {props.statement ? <PacmanLoader color="#36d7b7" /> : ""}
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
          <Input
            label="Password confirm"
            input={{
              id: "Passwordconfirm",
              type: "password",
              name: "confirmpassword",
              value: props.formik.values.confirmpassword,
              onChange: props.formik.handleChange,
            }}
            touched={props.formik.touched.confirmpassword}
            error={props.formik.errors.confirmpassword}
            message={props.formik.errors.confirmpassword}
          ></Input>
        </div>
        <button className={classes.button} type="submit">
          Sign up
        </button>
      </form>
      <div className={classes.routeToSignup}>
        <p>
          Already have an account?{" "}
          <Link className={classes.link} to={"/"}>
            Login
          </Link>
          .
        </p>
      </div>
      {props.success ? (
        <div className={classes.statementSignup}>
          <div className={classes.success}>{props.success}</div>
        </div>
      ) : (
        ""
      )}
      {props.failure ? (
        <div className={classes.statementSignup}>
          <div className={classes.failure}>{props.failure}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Formsignup;
