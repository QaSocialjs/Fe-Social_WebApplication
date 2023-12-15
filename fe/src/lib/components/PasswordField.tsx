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
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface Props extends TextFieldProps {
  name: string;
  label?: string;
  className?: string;
  description?: string;
  labelClassName?: string;
  inputClassName?: string;
  type?: string;
}
const PasswordField = React.forwardRef<HTMLInputElement, Props>(
  function TextField(
    {
      label,
      labelClassName,
      inputClassName,
      className,
      description,
      type = "password",
      ...props
    }: Props,
    ref
  ) {
    const [showError, setShowError] = useState<undefined | string | any>(
      undefined
    );
    const [typeState, setTypeState] = useState<boolean>(true);
    const { setFieldValue, setFieldTouched, errors, touched } =
      useFormContext()! || {};
    useEffect(() => {
      if (touched && errors) {
        setShowError(touched[props?.name] && errors[props?.name]);
      }
    }, [touched, errors]);
    function handleClickChangeStateType() {
      setTypeState((e) => !e);
    }
    return (
      <TextFieldAria {...props} className={cn(className)}>
        <Label
          className={clsx(labelClassName, {
            "text-negative-300": showError,
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
          <div className="absolute right-0 top-3">
            {typeState ? (
              <EyeIcon
                className="h-5 aspect-square p-0"
                onClick={handleClickChangeStateType}
              />
            ) : (
              <EyeSlashIcon
                className="h-5 aspect-square p-0"
                onClick={handleClickChangeStateType}
              />
            )}
          </div>
        </div>
        {showError ? (
          <div className="text-red-500">{showError as string}</div>
        ) : (
          ""
        )}
      </TextFieldAria>
    );
  }
);

export default PasswordField;
