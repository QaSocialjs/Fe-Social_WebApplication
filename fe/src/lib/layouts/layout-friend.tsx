import React from "react";
import { typeProps } from "../utils/typeProps";
import { cn } from "../utils/utils";
import SideBarFriend from "@components/Slidebar/SideBarFriend";
import { Outlet } from "react-router";

const LayoutFriend = ({ className }: typeProps): React.ReactElement => {
  return (
    <div
      className={cn(
        "w-screen grid grid-cols-[20%_80%] h-[calc(100vh-9vh)]",
        className
      )}
    >
      <SideBarFriend></SideBarFriend>
      <Outlet></Outlet>
    </div>
  );
};

export default LayoutFriend;
