import React from "react";
import { cn } from "../utils/utils";
import { Input as AriaInput, type InputProps } from "react-aria-components";

const baseClass =
  "input hover-input px-2 py-1 rounded transition-[background-color_outline] ease-in-out text-primary-400";

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props }: InputProps,
  ref
): React.ReactElement {
  return (
    <AriaInput ref={ref} {...props} className={cn(baseClass, className)} />
  );
});

export default Input;
