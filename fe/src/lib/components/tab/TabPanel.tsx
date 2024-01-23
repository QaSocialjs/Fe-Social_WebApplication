import { cn } from "@lib/utils/utils";
import React from "react";
import {
  TabPanel as TabPanelAria,
  TabPanelRenderProps,
} from "react-aria-components";
export interface Props extends Omit<TabPanelRenderProps | "id", "children"> {
  children: React.ReactNode;
  className?: string;
  id: any;
}
function TabPanel({ children, className, id, ...props }: Props) {
  return (
    <TabPanelAria {...props} id={id} className={cn("p-2", className)}>
      {children}
    </TabPanelAria>
  );
}

export default TabPanel;
