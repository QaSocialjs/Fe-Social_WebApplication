import {
  TextField as TextFieldAria,
  TextFieldProps,
} from "react-aria-components";
import { cn } from "../utils/utils";
import Input from "./Input";
import Label from "./Label";
import React from "react";

interface Props extends TextFieldProps {
  name: string;
  label?: string;
  className?: string;
  //   description?: string;
  //   errorMessage?: string;
  labelClassName?: string;
  inputClassName?: string;
}
const TextField = React.forwardRef<HTMLInputElement, Props>(function TextField(
  { label, labelClassName, inputClassName, className, ...props }: Props,
  ref
) {
  return (
    <TextFieldAria {...props} className={cn(className)}>
      <Label className={cn("", labelClassName)}>{label} *</Label>
      <Input
        ref={ref}
        name={props.name}
        className={cn("", inputClassName, {})}
      ></Input>
    </TextFieldAria>
  );
});

export default TextField;
