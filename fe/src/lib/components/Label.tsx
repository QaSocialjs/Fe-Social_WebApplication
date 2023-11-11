import { cn } from "../utils/utils";
import { Label as AriaLabel, type LabelProps } from "react-aria-components";

const baseClass = "text-xs text-primary-800 font-semibold";
export default function Label({ className, children, ...props }: LabelProps) {
  return (
    <AriaLabel className={cn(baseClass, className)} {...props}>
      {children}
    </AriaLabel>
  );
}
