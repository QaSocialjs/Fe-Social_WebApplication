import {
  Text,
  TextField as TextFieldAria,
  TextFieldProps,
} from "react-aria-components";
import { cn } from "../utils/utils";
import Input from "./Input";
import Label from "./Label";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { SwitchTransition } from "transition-hook";
import { FormikErrors } from "formik";

export interface PasswordFieldProps extends TextFieldProps {
  name: string;
  label?: string;
  className?: string;
  description?: string;
  labelClassName?: string;
  inputClassName?: string;
  type?: string;
  errMessage?: string;
}
interface UncontrollerPasswordFieldProps extends PasswordFieldProps {
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
const UncontrollerPasswordField = React.forwardRef<
  HTMLInputElement,
  UncontrollerPasswordFieldProps
>(function UncontrollerPasswordField(
  {
    type = "password",
    label,
    labelClassName,
    inputClassName,
    className,
    description,
    errMessage,
    setFieldValue,
    setFieldTouched,
    ...props
  }: UncontrollerPasswordFieldProps,
  ref
) {
  const invalid = !!errMessage;

  useEffect(() => {
    if (!errMessage) {
      return;
    }
  }, [errMessage]);
  const [typeState, setTypeState] = useState<boolean>(true);
  function handleClickChangeStateType() {
    setTypeState((e) => !e);
  }
  return (
    <TextFieldAria {...props} className={cn(className)}>
      <Label
        className={clsx(labelClassName, {
          "text-negative-300": invalid,
        })}
      >
        {label} *
      </Label>
      <div className="w-full relative">
        <Input
          ref={ref}
          name={props.name}
          type={typeState ? type : "text"}
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
        <div className="absolute right-2 top-3 cursor-pointer">
          {typeState ? (
            <EyeIcon
              className="h-5 aspect-square"
              onClick={handleClickChangeStateType}
            />
          ) : (
            <EyeSlashIcon
              className="h-5 aspect-square"
              onClick={handleClickChangeStateType}
            />
          )}
        </div>
      </div>
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

export default UncontrollerPasswordField;
