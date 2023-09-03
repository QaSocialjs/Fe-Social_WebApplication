import classes from "./Home.module.css";
import React, { useEffect, useState } from "react";
import { homeLink } from "../../../lib/Data/LinkHome";
import Foryou from "./foryou /Foryou";
import Following from "./Following/Following";
import TitleHeader from "../../../components/UI/Title";
import { Quad, gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";
import Post from "./post/Post";
const Home = (): React.ReactElement => {
  let state: Flip.FlipState;
  gsap.registerPlugin(Flip);
  useEffect(() => {
    state = Flip.getState(".flip");
  }, []);
  const idShowfou = crypto.randomUUID();
  const idShowFollow = crypto.randomUUID();
  const [showforyou, setShowForyou] = useState<boolean>(true);
  const [pathHome, setPathHome] = useState<string>("foryou");
  const switchHomeFeature = (href: string) => {
    state = Flip.getState(".flip", { simple: true });
    if (href === "foryou") {
      setShowForyou(true);
    } else {
      Flip.from(state, {
        targets: ".flip",
        duration: 0.15,
        ease: Quad.easeInOut,
      });
      setShowForyou(false);
    }
    setPathHome(href);
  };
  return (
    <section className={classes.sectionHome}>
      <TitleHeader name="Home"></TitleHeader>
      <div className={classes.chossionHome}>
        {homeLink.map(({ ...homeData }, idx) => (
          <div
            key={idx}
            onClick={() => switchHomeFeature(homeData.href)}
            className={`${classes[homeData.href]} ${
              showforyou && homeData.href === "foryou"
                ? classes.show
                : !showforyou && homeData.href !== "foryou"
                ? classes.show
                : classes.hidden
            }
            `}
          >
            {homeData.linkName}

            {showforyou && homeData.href === "foryou" ? (
              <div data-flip-id={idShowfou} className={classes.underline}></div>
            ) : !showforyou && homeData.href !== "foryou" ? (
              <div
                data-flip-id={idShowFollow}
                className={classes.underline}
              ></div>
            ) : (
              <div
                data-flip-id={idShowFollow}
                className={classes.hiddenUnder + "flip"}
              ></div>
            )}
          </div>
        ))}
      </div>
      <Post></Post>
      <div>
        {pathHome === "foryou" ? <Foryou></Foryou> : <Following></Following>}
      </div>
    </section>
  );
};
export default Home;
