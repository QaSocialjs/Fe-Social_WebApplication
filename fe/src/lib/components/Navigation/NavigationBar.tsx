import React from "react";
import { data, dataInfor } from "../../utils/datasiderbar";
import { useLocation } from "react-router";
import Logo from "../Logo";
import Link from "../Link";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";
import AccountMenuDropBar from "src/routes/home/AccountMenuDropBar";
import Notification from "@components/NotificationComp";

export default function NavigationBar(): React.ReactNode {
  const { pathname } = useLocation();

  return (
    <nav className="sticky flex h-fit px-4 top-0 z-50 justify-between items-center bg-primary-100  border-t-0 border-r-0 border-l-0 border-b border-solid border-b-primary-950 border-opacity-10 shadow-lg">
      <div className="flex items-center justify-center gap-2">
        <Logo className="text-primary-50 aspect-square"></Logo>
        <p className="mt-2">QuocAnhSocialApp</p>
      </div>
      <div className="flex gap-6 text-center">
        {data.map(({ ...item }, idx) => (
          <Link
            className={clsx("relative text-center items-center w-[90px] py-2", {
              "text-primary-950": pathname !== item.link,
            })}
            key={idx}
            href={`${item.link}`}
            data-tooltip-id={item.name}
            data-tooltip-content={item.name}
          >
            <div className="hover:bg-primary-900 hover:bg-opacity-10 rounded-lg">
              <item.iconName className="h-10 py-2 px-2 w-fit"></item.iconName>
            </div>
            <Tooltip id={item.name} />
            {pathname === item.link ? (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 border-2  border-solid border-accent-400 w-full"
              />
            ) : (
              ""
            )}
          </Link>
        ))}
      </div>
      <div className="flex gap-2 items-center justify-center">
        <Notification />
        <AccountMenuDropBar />
      </div>
    </nav>
  );
}
