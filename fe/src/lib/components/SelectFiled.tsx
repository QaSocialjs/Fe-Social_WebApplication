import { useEffect, useState } from "react";
import { useFormContext } from "./Form";
import UncontrollerSelectFiled, {
  UncontrollerSelectFiledProps,
} from "./UncontrollerSelectFiled";

interface SelectFiledProps<T extends object>
  extends UncontrollerSelectFiledProps<T> {}
function SelectFiled<T extends object>({
  errorMessage,
  ...props
}: SelectFiledProps<T>) {
  const [showError, setShowError] = useState<undefined | string | any>(
    undefined
  );
  let key = -1;
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormContext()! || {};
  useEffect(() => {
    if (touched && errors) {
      setShowError(touched[props?.name] && errors[props?.name]);
    }
  }, [touched, errors]);
  return (
    <UncontrollerSelectFiled
      {...props}
      errorMessage={errorMessage ?? showError}
      defaultSelectedKey={key}
      onSelectionChange={(e) => {
        setFieldValue(props.name, e);
      }}
      onBlur={(e) => {
        setFieldTouched(props.name, true), props.onBlur?.(e);
      }}
    />
  );
}

export default SelectFiled;
