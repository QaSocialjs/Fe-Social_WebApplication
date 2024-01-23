import React from "react";
import NavigationBar from "@components/Navigation/NavigationBar";
import { Outlet } from "react-router";

const Mainlayout = (): React.ReactNode => {
  return (
    <div className="w-full h-full flex flex-col">
      <NavigationBar />
      <div className="bg-primary-50">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Mainlayout;
