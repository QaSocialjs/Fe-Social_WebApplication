import React from "react";
import classes from "./cardrep.module.css";
import avt from "../../../../assets/avatar.jpg";
const CardRep = (props: any) => {
  return (
    <div className={classes.cardContainer}>
      <img src={avt} alt="" className={classes.img} />
      <p className={classes.repName}>{props.name}</p>
    </div>
  );
};

export default CardRep;
