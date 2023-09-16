import React from "react";
import classes from "./IconSvg.module.css";

const IconSvg = (props: any) => {
  console.log(props.className);
  return (
    <div
      className={
        props.className !== undefined
          ? classes[props.className]
          : classes.IconSvg
      }
    >
      {props.isActive ? props.IconisActive : props.iconName}
    </div>
  );
};

export default IconSvg;
