import classes from "./dashboard.module.css";
import Icon from "../../../components/Icon";
import Icon2 from "../../../components/Icon2";
import avatar from "../../../assets/avatar.jpg";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../../store/authSlice";
import Repository from "./repository/Repository";
import Showdialogrep from "./overlays/Showdialogrep";
import Interceptor from "../../../lib/RefreshToken";
function Dashbord() {
  const { accesstoken } = useSelector((state: any) => state.auth);
  const [dialog, setDialog] = useState<boolean>(false);
  const axiosJWT = axios.create();
  Interceptor(axiosJWT);
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const ShowDialog = () => {
    setDialog((pre) => !pre);
  };
  useEffect(() => {
    console.log(accesstoken);
    axios.defaults.withCredentials = true;
    axiosJWT
      .get("http://localhost:3000/api/v1/Home", {
        headers: {
          Authorization: "Bearer " + accesstoken,
        },
      })
      .catch((e) => {
        navigate("/Error/403");
      });
  }, [accesstoken]);
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
      <div>
        <div className={classes.repository}>
          <Repository title="NNQA" topRep="Top Repository"></Repository>
        </div>
      </div>

      {dialog ? <Showdialogrep></Showdialogrep> : ""}
    </div>
  );
}

export default Dashbord;
