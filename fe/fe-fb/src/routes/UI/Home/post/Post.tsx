import React from "react";
import classes from "./Post.module.css";
import avt from "../../../../assets/avatar.jpg";
import { IconTweetData } from "../../../../lib/Data/Tweet";
import { HeroIcon } from "../../../../components/Icon/hero-icon";
import Button from "../../../../components/Button";

function Post() {
  return (
    <div className={classes.Post}>
      <div>
        <img src={avt} alt="" className={classes.img} />
      </div>
      <div className={classes.tweet}>
        <div>
          <input type="text" placeholder="What is happenning?!" />
        </div>
        <div className={classes.grActionTweet}>
          <div className={classes.grICon}>
            {IconTweetData.map(({ ...icondata }, idx) => (
              <HeroIcon iconName={icondata.iconName} key={idx}></HeroIcon>
            ))}
          </div>
          <div className={classes.grbutton}>
            <Button name="Tweet"></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
