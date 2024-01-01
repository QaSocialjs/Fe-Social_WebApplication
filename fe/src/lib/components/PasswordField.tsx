import React, { useEffect, useState } from "react";
import { useFormContext } from "./Form";
import UncontrollerPasswordField, {
  PasswordFieldProps,
} from "./UncontrollerPasswordFiled";

interface Props extends PasswordFieldProps {}
const PasswordField = React.forwardRef<HTMLInputElement, Props>(
  function PasswordField(
    { className, description, defaultValue, errMessage, ...props }: Props,
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
      <UncontrollerPasswordField
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

export default PasswordField;
