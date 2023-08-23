import React from "react";
import classes from "./404Error.module.css";
import { useNavigate } from "react-router-dom";
function Error404() {
  const navigate = useNavigate();
  const handleBacktoHome = () => {
    navigate("/Dashboard");
  };
  return (
    <div className={classes.box}>
      <h1 className={classes.title}>Oops!</h1>
      <div className={classes.message}>404-Page Not Found</div>
      <div className={classes.message2}>
        Sorry, the page you are looking for doesnt exist or has been moved.
      </div>
      <button onClick={handleBacktoHome}>Back to home</button>
    </div>
  );
}

export default Error404;
