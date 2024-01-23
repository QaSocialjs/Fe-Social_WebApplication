import { cn } from "@lib/utils/utils";
import React from "react";
import { TabList, TabListProps } from "react-aria-components";
export interface Props<T extends object> extends TabListProps<T> {
  children: React.ReactNode | ((value: T) => React.ReactNode);
  className?: string;
}
function Tablist<T extends object>({
  children,
  className,
  ...props
}: Props<T>) {
  return (
    <TabList {...props} className={cn("flex", className)}>
      {children}
    </TabList>
  );
}

export default Tablist;
