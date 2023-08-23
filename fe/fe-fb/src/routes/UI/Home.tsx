import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000/api/v1/Home").catch((e) => {
      navigate("/Error/403");
    });
  }, []);
  const logout = () => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000/api/v1/logout").then((r) => {
      if (r.data.status === "success") {
        navigate("/");
      }
    });
  };
  return <div onClick={logout}>adasd</div>;
};
export default Home;
