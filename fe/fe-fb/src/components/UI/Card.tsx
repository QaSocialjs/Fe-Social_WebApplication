import React from "react";
import { dataHomeType } from "../../lib/Data/Home";
import avt from "../../assets/avatar.jpg";
import classes from "./Card.module.css";
import IconSvg from "../Icon/IconSvg";
const Card = ({
  name,
  title,
  iConCmt,
  iConHeart,
  iConRepost,
  iConShare,
}: dataHomeType): React.ReactElement => {
  return (
    <>
      <div className={classes.containerCard}>
        <div>
          <img src={avt} alt="" className={classes.AvtImg} />
        </div>
        <div className={classes.boxData}>
          <h5 className={classes.name}>{name}</h5>
          <div>
            <p>{title}</p>
          </div>
          <div className={classes.boxImg}>
            <img src={avt} alt="" className={classes.dataImg} />
          </div>
          <div className={classes.boxIcon}>
            <div className={classes.grIcon}>
              <IconSvg
                iconName={iConCmt}
                className="iconHome"
                hover="blue"
              ></IconSvg>
              <p>47</p>
            </div>
            <div className={classes.grIcon}>
              <IconSvg
                iconName={iConHeart}
                className="iconHome"
                hover="green"
              ></IconSvg>
              <p>47</p>
            </div>
            <div className={classes.grIcon}>
              <IconSvg
                iconName={iConRepost}
                className="iconHome"
                hover="pink"
              ></IconSvg>
              <p>47</p>
            </div>
            <div className={classes.grIcon}>
              <IconSvg
                iconName={iConShare}
                className="iconHome"
                hover="blue"
              ></IconSvg>
              <p>47</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
