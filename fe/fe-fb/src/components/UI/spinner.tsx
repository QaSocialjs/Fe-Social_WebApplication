import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Spinner = (props: any) => {
  useEffect(() => {
    const timer = setInterval(() => {
      props.setLoad((pre: any) => !pre);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <ClipLoader color="#219bef" size={15}></ClipLoader>;
};

export default Spinner;
