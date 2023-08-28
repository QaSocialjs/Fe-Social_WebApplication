import React from "react";
import classes from "./InputCreate.module.css";
const InputCreate = (props: any) => {
  return (
    <div className={classes.input}>
      <div className={classes.inputBox}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input
          {...props.input}
          className={`${props.touched && props.error ? classes.error : ""}`}
        />
      </div>
      <span>{props.touched && props.error ? props.message : ""}</span>
    </div>
  );
};

export default InputCreate;
