import type { ReactNode } from "react";
import { Tabs as AriaTabs, type TabsProps } from "react-aria-components";
import Tablist from "./Tablist";
import Tab from "./Tab";
import TabPanel from "./TabPanel";
import { cn } from "@lib/utils/utils";
import { Outlet } from "react-router-dom";
import React from "react";
import clsx from "clsx";

type Props = Omit<TabsProps, "items"> & {
  items: { label: string; panel: ReactNode; href?: string }[];
  className?: string;
  tabListclassName?: string;
  tabclassName?: string;
  tabPanelclassName?: string;
  pathname?: string;
};

const baseClass1 = "flex flex-col gap-5 outline-none mt-4";
const baseClass2 = "flex no-underline";
const baseClass3 =
  "cursor-pointer relative w-fit font-bold flex justify-center px-4 outline-none";
function Tabs({
  items,
  className,
  tabListclassName,
  tabclassName,
  pathname,
  tabPanelclassName,
  ...props
}: Props) {
  let panelNode: React.ReactNode;
  let listNode: React.ReactNode;

  if (pathname) {
    listNode = (
      <Tablist className={cn(baseClass2, tabListclassName)}>
        {items.map(({ label, href }) => (
          <Tab
            id={label}
            className={clsx(baseClass3, tabclassName)}
            key={label}
            href={href}
          >
            <span
              className={clsx("py-2", {
                "text-accent-300":
                  pathname === href ||
                  pathname.includes(label.toLocaleLowerCase()),
              })}
            >
              {label}
            </span>
            <div className="absolute w-full h-full hover:bg-primary-600 hover:bg-opacity-10 rounded-md"></div>
            {pathname === href ||
            pathname.includes(label.toLocaleLowerCase()) ? (
              <div className="h-[3px] transition-colors w-full absolute bg-accent-300 bottom-0" />
            ) : null}
          </Tab>
        ))}
      </Tablist>
    );
    panelNode = (
      <TabPanel id={pathname} key={pathname} className={tabPanelclassName}>
        <Outlet />
      </TabPanel>
    );
  } else {
    listNode = (
      <Tablist className={cn(baseClass2, tabListclassName)}>
        {items.map(({ label }) => (
          <Tab
            id={label}
            className={clsx(baseClass3, tabclassName)}
            key={label}
          >
            <span className="py-2">{label}</span>
            <div className="absolute w-full h-full hover:bg-primary-600 hover:bg-opacity-10 rounded-md"></div>
          </Tab>
        ))}
      </Tablist>
    );
    panelNode = items.map(({ label, panel }) => (
      <TabPanel id={label} key={label}>
        {panel}
      </TabPanel>
    ));
  }

  return (
    <AriaTabs
      className={cn(baseClass1, className)}
      {...props}
      selectedKey={pathname}
    >
      {listNode}
      {panelNode}
    </AriaTabs>
  );
}

export default Tabs;
