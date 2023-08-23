import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MiddleWare = async () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000/api/v1/Home").catch((e) => {
      navigate("/Error/403");
    });
  });
};

export default MiddleWare;
