import { cn } from "@lib/utils/utils";
import clsx from "clsx";
import type { ReactNode } from "react";
import {
  Popover as AriaPopover,
  OverlayArrow,
  type PopoverProps,
} from "react-aria-components";

interface Props extends Omit<PopoverProps, "children"> {
  children: ReactNode;
}
export default function Popover({ children, className, ...props }: Props) {
  return (
    <AriaPopover
      {...props}
      className={({ isEntering, isExiting }) =>
        cn(
          "w-[--trigger-width] rac-placement-bottom:mt-4 rac-placement-top:mb-4 group rounded-lg drop-shadow-lg border border-primary-200 ring-1 ring-primary-950/60 bg-primary-50",
          isEntering &&
            `rac-placement-bottom:animate-duration-100 rac-placement-bottom:animate-ease-in-out
            rac-placement-top:animate-duration-100 rac-placement-top:animate-ease-in-out
            rac-placement-bottom:animate-fadeInDownBig rac-placement-bottom:animate-distance-2
            rac-placement-top:animate-fadeInUpBig rac-placement-top:animate-distance-2`,
          isExiting &&
            `rac-placement-bottom:animate-duration-100 rac-placement-bottom:animate-ease-in-out
            rac-placement-top:animate-duration-100 rac-placement-top:animate-ease-in-out
            rac-placement-bottom:animate-fadeOutUpBig rac-placement-bottom:animate-distance-2
            rac-placement-top:animate-fadeOutDownBig rac-placement-top:animate-distance-2`,
          className
        )
      }
    >
      <OverlayArrow>
        <svg
          viewBox="0 0 12 12"
          className="block fill-primary-50 stroke-primary-200 group-rac-placement-bottom:rotate-180 w-3 h-3"
        >
          <path d="M0 0L6 6L12 0" />
        </svg>
      </OverlayArrow>
      {children}
    </AriaPopover>
  );
}
