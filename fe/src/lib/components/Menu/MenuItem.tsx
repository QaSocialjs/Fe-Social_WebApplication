import clsx from "clsx";
import type { MenuItemProps } from "react-aria-components";
import { MenuItem as MenuItemAria } from "react-aria-components";

export default function MenuItem({
  children,
  className,
  ...props
}: MenuItemProps) {
  let textValue =
    props.textValue || (typeof children === "string" ? children : undefined);
  return (
    <MenuItemAria
      {...props}
      textValue={textValue}
      className={clsx("w-full outline-none", className)}
    >
      {children}
    </MenuItemAria>
  );
}
