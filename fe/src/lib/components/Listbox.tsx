import { cn } from "@lib/utils/utils";
import React from "react";
import { ListBoxProps, ListBox as AriaListBox } from "react-aria-components";

export type ListboxProps<T extends Object> = Omit<
  ListBoxProps<T>,
  "children"
> & {
  children: React.ReactNode | ((value: T) => React.ReactNode);
  className?: string;
};

export function Listbox<T extends object>({
  children,
  className,
  ...props
}: ListboxProps<T>) {
  return (
    <AriaListBox {...props} className={cn("listbox grid", className)}>
      {children}
    </AriaListBox>
  );
}
