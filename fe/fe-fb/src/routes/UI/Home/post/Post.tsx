import React, { ChangeEvent, useRef, useState } from "react";
import classes from "./Post.module.css";
import avt from "../../../../assets/avatar.jpg";
import { IconTweetData } from "../../../../lib/Data/Tweet";
import { HeroIcon } from "../../../../components/Icon/hero-icon";
import Button from "../../../../components/Button";

function Post() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    console.log(file);
    if (file) {
      const imgUrl = URL.createObjectURL(file);

      setSelectedImg(imgUrl);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={classes.Post}>
      <div>
        <img src={avt} alt="" className={classes.img} />
      </div>
      <div className={classes.tweet}>
        <div
          className={`${classes.grTextAndImg} ${selectedImg && classes.addImg}`}
        >
          <input type="text" placeholder="What is happenning?!" />
          {selectedImg && (
            <div>
              <img src={selectedImg} alt="Selected" />
            </div>
          )}
        </div>
        <div className={classes.grActionTweet}>
          <div className={classes.grICon}>
            {IconTweetData.map(({ ...icondata }, idx) => {
              if (icondata.iconName === "PhotoIcon") {
                return (
                  <div className={classes.openFolder} onClick={handleClick}>
                    <HeroIcon iconName={icondata.iconName} key={idx}></HeroIcon>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleInputChange}
                    />
                  </div>
                );
              } else {
                return (
                  <HeroIcon iconName={icondata.iconName} key={idx}></HeroIcon>
                );
              }
            })}
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
