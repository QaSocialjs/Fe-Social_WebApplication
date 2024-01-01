import React, { useEffect, useState } from "react";
import UncontrollerTextfield, { FieldProps } from "./UncontrollerTextfield";
import { useFormContext } from "./Form";

interface TextFieldProps extends FieldProps {}
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      className,
      description,
      defaultValue,
      errMessage,
      ...props
    }: TextFieldProps,
    ref
  ) {
    const { setFieldValue, setFieldTouched, errors, touched } =
      useFormContext()! || {};
    const [showError, setShowError] = useState<undefined | string | any>(
      undefined
    );
    useEffect(() => {
      if (touched && errors) {
        setShowError(touched[props?.name] && errors[props?.name]);
      }
    }, [touched, errors]);
    return (
      <UncontrollerTextfield
        {...props}
        ref={ref}
        defaultValue={defaultValue ?? ""}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
        errMessage={errMessage ?? showError}
      />
    );
  }
);

export default TextField;
