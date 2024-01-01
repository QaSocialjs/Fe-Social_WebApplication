import {
  Text,
  TextField as TextFieldAria,
  TextFieldProps,
} from "react-aria-components";
import { cn } from "../utils/utils";
import Input from "./Input";
import Label from "./Label";
import React, { useEffect } from "react";
import clsx from "clsx";
import { SwitchTransition } from "transition-hook";
import { FormikErrors } from "formik";

export interface FieldProps extends TextFieldProps {
  name: string;
  label?: string;
  className?: string;
  description?: string;
  labelClassName?: string;
  inputClassName?: string;
  errMessage?: string;
}
interface UncontrollerTextfieldProps extends FieldProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<any>>;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<any>>;
}
const UncontrollerTextfield = React.forwardRef<
  HTMLInputElement,
  UncontrollerTextfieldProps
>(function UncontrollerTextfield(
  {
    label,
    labelClassName,
    inputClassName,
    className,
    description,
    errMessage,
    setFieldValue,
    setFieldTouched,
    ...props
  }: UncontrollerTextfieldProps,
  ref
) {
  const invalid = !!errMessage;

  useEffect(() => {
    if (!errMessage) {
      return;
    }
  }, [errMessage]);
  return (
    <TextFieldAria {...props} className={cn(className)}>
      <Label
        className={clsx(labelClassName, {
          "text-negative-300": invalid,
        })}
      >
        {label} *
      </Label>
      <Input
        ref={ref}
        name={props.name}
        className={cn("w-full", inputClassName, {
          "border-red-500": invalid,
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
      <SwitchTransition state={invalid} timeout={200} mode="out-in">
        {(invalid, stage) => (
          <div
            className={clsx(
              "transition-opacity duration-200 text-sm",
              {
                from: "opacity-0 ease-in",
                enter: "",
                leave: "opacity-0 ease-out",
              }[stage]
            )}
          >
            {invalid ? (
              <Text slot="errorMessage" className="text-negative-500">
                {errMessage}
              </Text>
            ) : null}
          </div>
        )}
      </SwitchTransition>
    </TextFieldAria>
  );
});

export default UncontrollerTextfield;
