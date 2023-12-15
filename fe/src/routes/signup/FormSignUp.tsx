import { FormikHelpers } from "formik";
import Form from "@components/Form";
import TextField from "@components/TextField";
import Checkbox from "@components/Checkbox";
import PasswordField from "@components/PasswordField";
import Link from "@components/Link";
import Button from "@components/Button";
import { hookDispatchThunk } from "@lib/hook/ReduxHook";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux/Store";
import { ApiError } from "@lib/services/ErrorApi";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@components/ProgressCricle";
import BoxAlert from "@components/BoxAlert";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getLoginFormSchema } from "./index";
import { Signup } from "@lib/redux/user/UserThunk";
import { useNavigate } from "react-router";

function FormSignUp() {
  const dispatch = hookDispatchThunk();

  const { t, i18n } = useTranslation();
  const schema = useMemo(() => getLoginFormSchema(), [i18n.language]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [timeErr, setTimeErr] = useState<boolean>(false);
  const [timeSuccess, setTimeSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const { loading, errors, success } = useSelector(
    (state: RootState) => ({
      loading: state.loading,
      errors: state.errors as ApiError,
      success: state.success,
    }),
    (prev, curr) =>
      prev.loading === curr.loading &&
      prev.errors === curr.errors &&
      prev.success === curr.success
  );

  useEffect(() => {
    if (errors !== null && errors.details) {
      const timer = setTimeout(() => setTimeErr(false), 2000);
      setTimeErr(true);
      return () => {
        setTimeErr(false);
        clearTimeout(timer);
      };
    }
  }, [errors]);
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setTimeSuccess(false), 1000);
      setTimeSuccess(true);
      return () => {
        setTimeSuccess(false);
        clearTimeout(timer);
      };
    }
  }, [success]);
  return (
    <div className="w-[25rem] flex flex-col gap-6">
      <Form
        className="flex flex-col gap-6 w-full"
        validationSchema={schema}
        initialValues={{ email: "", password: "", confirmpassword: "" }}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          dispatch(
            Signup({
              email: values.email,
              password: values.password,
              confirmpassword: values.confirmpassword,
            })
          ).then(() => {
            formikHelpers.resetForm();
            if (emailInputRef.current) {
              emailInputRef.current.value = "";
            }
            if (passwordInputRef.current) {
              passwordInputRef.current.value = "";
            }
            if (confirmPasswordInputRef.current) {
              confirmPasswordInputRef.current.value = "";
            }
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          });
        }}
      >
        <TextField
          ref={emailInputRef}
          name="email"
          id="email"
          isRequired
          label={t("authentication.signup.email.label")}
          type="text"
          className="flex flex-col text-primary-0"
          inputClassName="text-base font-bold py-3 bg-primary-100"
          labelClassName="text-base"
        ></TextField>
        <PasswordField
          ref={passwordInputRef}
          name="password"
          id="password"
          isRequired
          label={t("authentication.signup.password.label")}
          type="password"
          className="flex flex-col"
          inputClassName="text-base font-bold py-3 bg-primary-100"
          labelClassName="text-base"
        ></PasswordField>
        <PasswordField
          ref={confirmPasswordInputRef}
          name="confirmpassword"
          id="confirmpassword"
          isRequired
          label={t("authentication.signup.confirmpassword.label")}
          type="password"
          className="flex flex-col"
          inputClassName="text-base font-bold py-3 bg-primary-100"
          labelClassName="text-base"
        ></PasswordField>
        <Button
          className="w-full py-3 rounded-full relative mt-2"
          type="submit"
          isDisabled={loading === true}
        >
          <span
            className={clsx("block transition ease-in-out", {
              "opacity-0": loading === true,
              "scale-0": loading === true,
            })}
          >
            Signup
          </span>
          <Transition
            show={loading === true}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3"
            enter="transition ease-in-out"
            enterFrom="opacity-0 scale-0"
            leave="transition ease-in-out duration-300"
            leaveTo="opacity-0 scale-0"
          >
            <ProgressCircle
              aria-label="signing in"
              className="h-full text-primary-500"
            ></ProgressCircle>
          </Transition>
        </Button>
      </Form>
      <div className="flex items-center justify-between">
        <hr className="w-[40%] h-[1.2px] bg-primary-300 outline-none border-none" />
        <span className="text-xs text-primary-300 font-bold">Other hand</span>
        <hr className="w-[40%] h-[1.2px] bg-primary-300 outline-none border-none" />
      </div>
      <div>
        <span className="text-xs">
          {t("authentication.footer.signup.title")}{" "}
        </span>
        <Link className="text-accent-300" href="/login">
          {t("authentication.footer.signup.link")}
        </Link>
      </div>
      <Transition
        show={timeErr}
        className="flex flex-col gap-6 w-full"
        enter="transition ease-in-out"
        enterFrom="opacity-0 scale-0"
        leave="transition ease-in-out duration-300"
        leaveTo="opacity-0 scale-0"
      >
        {errors && errors.details.errors && (
          <BoxAlert
            variant="negative"
            title="unknownError"
            body={errors.details.errors.message}
          ></BoxAlert>
        )}
      </Transition>
      <Transition
        show={timeSuccess}
        className="flex flex-col gap-6 w-full"
        enter="transition ease-in-out"
        enterFrom="opacity-0 scale-0"
        leave="transition ease-in-out duration-300"
        leaveTo="opacity-0 scale-0"
      >
        <BoxAlert
          variant="positive"
          title="Ok"
          body={t("authentication.signup.success")}
        ></BoxAlert>
      </Transition>
    </div>
  );
}

export default FormSignUp;
