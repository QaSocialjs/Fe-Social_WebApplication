import React from "react";
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
} from "react-aria-components";
import { cn } from "../utils/utils";

export type LinkProps = AriaLinkProps;

const baseClass =
  "text-cod-gray-900 text-sm gap-2 font-bold outline-none cursor-pointer";
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, ...props }: LinkProps,
  ref
) {
  return (
    <AriaLink
      ref={ref}
      className={cn(baseClass, className)}
      target="_self"
      {...props}
    ></AriaLink>
  );
});
export default Link;
