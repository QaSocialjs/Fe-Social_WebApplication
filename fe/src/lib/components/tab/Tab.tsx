import { cn } from "@lib/utils/utils";
import React from "react";
import { TabProps, Tab as TabsAria } from "react-aria-components";
export interface Props extends TabProps {
  children: React.ReactNode;
  className?: string;
}

function Tab({ children, className, ...props }: Props) {
  return (
    <TabsAria
      {...props}
      className={cn(
        "outline-none no-underline text-primary-900 text-opacity-80 transition-colors rac-selected:text-accent-300 rac-selected:border-b-[3px] rac-selected:border-solid rac-selected:border-t-0 rac-selected:border-l-0 rac-selected:border-r-0",
        className
      )}
    >
      {children}
    </TabsAria>
  );
}

export default Tab;
