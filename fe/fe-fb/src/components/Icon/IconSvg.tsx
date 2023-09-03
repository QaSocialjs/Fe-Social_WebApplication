import React from "react";
import classes from "./IconSvg.module.css";

const IconSvg = (props: any) => {
  return (
    <div className={classes.IconSvg}>
      {props.isActive ? props.IconisActive : props.iconName}
    </div>
  );
};

export default IconSvg;
