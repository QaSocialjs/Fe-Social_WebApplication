import { Button as AriaButton, type ButtonProps } from "react-aria-components";
import Link from "./Link";
import { cn } from "../utils/utils";
import { ReactNode } from "react";

interface DefaultProps extends ButtonProps {
  variant?: "accent" | "primary";
}
type Props =
  | ({ as?: never } & DefaultProps)
  | ({ as: "link"; variant?: "accent" | "primary" } & Parameters<
      typeof Link
    >[0]);

const baseClass =
  "px-4 py-0.5 rounded-md border-none transition-[background-color_outline] ease-in-out font-bold";

const variantClass: Record<NonNullable<Props["variant"]>, string> = {
  accent: "bg-accent-200 text-primary-50 rac-hover:bg-accent-300",
  primary: "bg-primary-900 text-primary-100 rac-hover:border-primary-300",
};
const disabledClass =
  "rac-disabled:bg-primary-500 rac-disabled:bg-opacity-20 rac-disabled:text-primary-950 rac-disabled:text-opacity-20";

export default function Button({
  className,
  variant = "accent",
  ...props
}: Props) {
  let node: ReactNode;
  switch (props.as) {
    case "link": {
      node = (
        <Link
          {...props}
          className={cn(baseClass, variantClass[variant], className)}
        />
      );
      break;
    }
    default: {
      node = (
        <AriaButton
          {...props}
          className={cn(
            baseClass,
            variantClass[variant],
            disabledClass,
            className
          )}
        />
      );
      break;
    }
  }

  return node;
}
