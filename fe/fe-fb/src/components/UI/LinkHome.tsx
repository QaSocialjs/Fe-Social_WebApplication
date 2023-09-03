import { NavLink } from "react-router-dom";
import classes from "./LinkProps.module.css";
import IconSvg from "../Icon/IconSvg";
import { Navlink } from "../../lib/Data/Navlink";
const LinkHome = ({
  href,
  iconName,
  linkName,
  IconisActive,
}: Navlink): React.ReactElement => {
  return (
    <NavLink to={`/${href}`} className={classes.modifyCssClass}>
      <IconSvg
        iconName={iconName}
        isActive={true}
        IconisActive={iconName}
      ></IconSvg>
    </NavLink>
  );
};

export default LinkHome;
