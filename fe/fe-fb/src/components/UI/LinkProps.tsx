import { NavLink } from "react-router-dom";
import { Navlink } from "../../lib/Data/Navlink";
import { HeroIcon } from "../Icon/hero-icon";
import classes from "./LinkProps.module.css";
import { IconName } from "../../components/Icon/hero-icon";
import { string } from "yup";
import IconSvg from "../Icon/IconSvg";
const LinkProps = ({
  href,
  iconName,
  linkName,
  IconisActive,
}: Navlink): React.ReactElement => {
  return (
    <NavLink to={`/${href}`} className={classes.modifyCssClass}>
      {({ isActive, isPending }) => {
        if (typeof iconName === "string") {
          return (
            <div className={`${classes.Linkprops}`}>
              <HeroIcon
                iconName={iconName as any}
                className={isActive ? "true" : "false"}
              ></HeroIcon>
              <div className={`${isActive ? classes.fontBold : ""}`}>
                {linkName}
              </div>
            </div>
          );
        } else {
          return (
            <div className={`${classes.Linkprops}`}>
              <IconSvg
                iconName={iconName}
                isActive={isActive}
                IconisActive={IconisActive}
              ></IconSvg>
              <div
                className={`${isActive ? classes.fontBold : ""} ${
                  classes.linkName
                }`}
              >
                {linkName}
              </div>
            </div>
          );
        }
      }}
    </NavLink>
  );
};

export default LinkProps;
