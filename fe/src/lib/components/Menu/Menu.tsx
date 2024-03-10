import Button from "@components/Button";
import Popover from "@components/Popover";
import { cn } from "@lib/utils/utils";
import React from "react";
import {
  MenuTrigger,
  type MenuProps,
  type MenuTriggerProps,
  Menu as MenuAria,
} from "react-aria-components";

interface MyMenuProps<T>
  extends MenuProps<T>,
    Omit<MenuTriggerProps, "children"> {
  labelMenu?: string | React.ReactNode;
  classBtn?: string;
  classPpv?: string;
  classNameMenu?: string;
  variantBtn: "primary" | "accent";
  // isOpen: boolean;
}

export default function MenuComponent<T extends object>({
  children,
  labelMenu,
  classBtn,
  classPpv,
  classNameMenu,
  variantBtn = "accent",
  // isOpen,
  ...props
}: MyMenuProps<T>) {
  return (
    <MenuTrigger {...props}>
      <Button className={cn("", classBtn)} variant={variantBtn}>
        {labelMenu}
      </Button>
      <Popover
        className={cn(
          "w-[25vw] outline-none rac-focus:outline-none rac-hover:outline-none focus:outline-none",
          classPpv
        )}
      >
        <MenuAria {...props} className={cn("outline-none", classNameMenu)}>
          {children}
        </MenuAria>
      </Popover>
    </MenuTrigger>
  );
}
