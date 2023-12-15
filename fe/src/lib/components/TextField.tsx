import {
  TextField as TextFieldAria,
  TextFieldProps,
} from "react-aria-components";
import { cn } from "../utils/utils";
import Input from "./Input";
import Label from "./Label";
import React, { useEffect, useState } from "react";
import { useFormContext } from "./Form";
import clsx from "clsx";

interface Props extends TextFieldProps {
  name: string;
  label?: string;
  className?: string;
  description?: string;
  labelClassName?: string;
  inputClassName?: string;
}
const TextField = React.forwardRef<HTMLInputElement, Props>(function TextField(
  {
    label,
    labelClassName,
    inputClassName,
    className,
    description,
    ...props
  }: Props,
  ref
) {
  const [showError, setShowError] = useState<undefined | string | any>(
    undefined
  );
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormContext()! || {};
  useEffect(() => {
    if (touched && errors) {
      setShowError(touched[props?.name] && errors[props?.name]);
    }
  }, [touched, errors]);
  return (
    <TextFieldAria {...props} className={cn(className)}>
      <Label
        className={clsx(labelClassName, {
          "text-negative-300": showError,
        })}
      >
        {label} *
      </Label>
      <Input
        ref={ref}
        name={props.name}
        className={cn("w-full", inputClassName, {
          "border-red-500": showError,
        })}
        onBlur={(e) => {
          setFieldTouched(props.name, true);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          const { value } = e.target;
          setFieldValue(props.name, value);
          props.onChange?.(value);
        }}
      />
      {showError ? (
        <div className="text-red-500">{showError as string}</div>
      ) : (
        ""
      )}
    </TextFieldAria>
  );
});

export default TextField;
