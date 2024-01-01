import React from "react";
import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
} from "react-aria-components";
import { cn } from "../utils/utils";
import { Link as ReactRouterLink } from "react-router-dom";

export type LinkProps = AriaLinkProps;

const baseClass =
  "text-accent-500 text-sm gap-2 font-bold outline-none cursor-pointer";
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
