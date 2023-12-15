import { cn } from "../utils/utils";
import * as Yup from "yup";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import React, { useContext } from "react";

const FormContext = React.createContext<FormikProps<any> | undefined>(
  undefined
);

export const useFormContext = (): FormikProps<any> => {
  return useContext<FormikProps<any>>(FormContext as any);
};
interface FormProps {
  children: React.ReactNode;
  validationSchema: Yup.ObjectSchema<any>;
  initialValues: any;
  onSubmit: (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
  className?: string;
}
const baseClass = "w-fit h-fit";
export default function Form({
  children,
  className,
  validationSchema,
  initialValues,
  onSubmit,
}: FormProps) {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  return (
    <form
      className={cn(baseClass, className)}
      onSubmit={(e) => {
        e.preventDefault(), formik.handleSubmit(e);
      }}
    >
      <FormContext.Provider value={formik}>{children}</FormContext.Provider>
    </form>
  );
}
