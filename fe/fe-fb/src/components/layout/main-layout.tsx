import React from "react";
import type { LayoutProps } from "./common-layout";
import { WindowContextProvider } from "../../lib/context/windown-context";

import classes from "./main-layout.module.css";
import Sidebar from "../sidebar/sidebar";
export const MainLayout = ({ children }: LayoutProps): React.ReactElement => {
  return (
    <div className={classes.mainLayout}>
      <WindowContextProvider>
        <Sidebar></Sidebar>
        <div className={classes.childrenMainlayout}>{children}</div>
      </WindowContextProvider>
    </div>
  );
};
