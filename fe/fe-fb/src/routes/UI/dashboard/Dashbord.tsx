import classes from "./dashboard.module.css";
import Icon from "../../../components/Icon/Icon";
import Icon2 from "../../../components/Icon/Icon2";
import avatar from "../../../assets/avatar.jpg";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../../store/authSlice";
import Showdialogrep from "./overlays/Showdialogrep";

function Dashbord(props: any) {
  const [dialog, setDialog] = useState<boolean>(false);
  const dispacth = useDispatch();
  const ShowDialog = () => {
    setDialog((pre) => !pre);
  };
  const handleLogout = () => {
    dispacth(Logout());
  };
  return (
    <div className={classes.container}>
      <nav className={classes["nav__container"]}>
        <div className={classes["nav__item"]}>
          <div className={classes["wrap__icon"]} onClick={ShowDialog}>
            <Icon2 icon="Bars3Icon"></Icon2>
          </div>
          <Icon icon="AcademicCapIcon"></Icon>
          <p className={classes["nav__text"]}>Dashboard</p>
        </div>
        <div className={classes["nav__item"]}>
          <div className={classes.search}>
            <div>
              <Icon2 icon="MagnifyingGlassIcon"></Icon2>
              <p className={classes["text_search"]}>
                Type <span>/</span> to search
              </p>
            </div>
          </div>
          <div className={classes.listOption}>
            <div className={classes.itemsOption}>
              <div className={`${classes["wrap__icon"]} ${classes["hidden"]}`}>
                <Icon2 icon="PlusIcon"></Icon2>
              </div>
              <div className={`${classes["wrap__icon"]} ${classes["hidden"]}`}>
                <Icon2 icon="RectangleGroupIcon"></Icon2>
              </div>
              <div className={`${classes["wrap__icon"]} ${classes["hidden"]}`}>
                <Icon2 icon="ArrowPathRoundedSquareIcon"></Icon2>
              </div>
              <div className={classes["wrap__icon"]}>
                <Icon2 icon="InboxIcon"></Icon2>
              </div>
            </div>
            <div className={classes.avatar} onClick={handleLogout}>
              <img src={avatar} alt="avatar" />
            </div>
          </div>
        </div>
      </nav>
      <div className={classes.subContent}>
        <Outlet></Outlet>
      </div>

      {dialog ? <Showdialogrep onClose={ShowDialog}></Showdialogrep> : ""}
    </div>
  );
}

export default Dashbord;
