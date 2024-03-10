import React from "react";
import NavigationBar from "@components/Navigation/NavigationBar";
import { Outlet } from "react-router";
import BoxAlertProvider from "@lib/context/BoxAlertcontext";

const Mainlayout = (): React.ReactNode => {
  return (
    <div className="w-screen h-screen">
      <BoxAlertProvider>
        <NavigationBar />
        <div className="bg-primary-50">
          <Outlet></Outlet>
        </div>
      </BoxAlertProvider>
    </div>
  );
};

export default Mainlayout;
