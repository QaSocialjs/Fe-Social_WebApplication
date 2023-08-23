import React from "react";
import classes from "./404Error.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../../store/authSlice";
function Erorr() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const handleBacktoHome = () => {
    dispacth(Logout());
    navigate("/");
  };
  return (
    <div className={classes.box}>
      <h1 className={classes.title}>Oops!</h1>
      <div className={classes.message}>Access Denied</div>
      <div className={classes.message2}>Invaid Token!!! Please</div>
      <button onClick={handleBacktoHome}> Back to Login</button>
    </div>
  );
}

export default Erorr;
