import { FormikHelpers } from "formik";
import Form from "@components/Form";
import TextField from "@components/TextField";
import PasswordField from "@components/PasswordField";
import Link from "@components/Link";
import Button from "@components/Button";
import { hookDispatchThunk } from "@lib/hook/ReduxHook";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux/Store";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@components/ProgressCricle";
import BoxAlert from "@components/BoxAlert";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSignupFormSchema } from "./index";
import { Signup } from "@lib/redux/user/UserThunk";
import { useNavigate } from "react-router";
import DatePicker from "@components/DatePicker";
import SelectFiled from "@components/SelectFiled";
import { CheckIcon } from "@heroicons/react/24/solid";
import ListBoxItem from "@components/ListBoxItem";
import { User, genderNames, genders } from "@lib/models/User";
import { TypeErrorAuthenticate } from "@lib/utils/typeErrorAuthentication";

function FormSignUp() {
  const dispatch = hookDispatchThunk();

  const { t, i18n } = useTranslation();
  const schema = useMemo(() => getSignupFormSchema(), [i18n.language]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [timeErr, setTimeErr] = useState<boolean>(false);
  const [timeSuccess, setTimeSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const { loading, errors, success } = useSelector(
    (state: RootState) => ({
      loading: state.loading,
      errors: state.errors,
      success: state.success,
    }),
    (prev, curr) =>
      prev.loading === curr.loading &&
      prev.errors === curr.errors &&
      prev.success === curr.success
  );
  useEffect(() => {
    if ((errors !== null && TypeErrorAuthenticate(errors.XErrorType)) === 1) {
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
    <div className="w-[28rem] flex flex-col gap-6">
      <Form
        className="flex flex-col gap-6 w-full"
        validationSchema={schema}
        initialValues={{
          email: "",
          password: "",
          confirmpassword: "",
          firstName: "",
          lastName: "",
          age: "",
          gender: -1,
        }}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          dispatch(
            Signup({
              ...values,
            })
          ).then((e: any) => {
            if (e.payload.isOk()) {
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
              setTimeout(async () => {
                const user = (await e.payload.value.json()) as User;
                const emailUrl = user.email.split(".")[0];
                navigate(`/confirmCode/${emailUrl}`);
              }, 1900);
            }
          });
        }}
      >
        <div className="flex gap-4 justify-between w-full">
          <TextField
            // ref={emailInputRef}
            name="firstName"
            id="firstName"
            isRequired
            label={t("authentication.signup.firstname.label")}
            type="text"
            className="flex flex-col"
            inputClassName="text-base font-bold py-3 bg-primary-100"
            labelClassName="text-base"
          ></TextField>
          <TextField
            // ref={emailInputRef}
            name="lastName"
            id="lastName"
            isRequired
            label={t("authentication.signup.lastname.label")}
            type="text"
            className="flex flex-col"
            inputClassName="text-base font-bold py-3 bg-primary-100"
            labelClassName="text-base"
          ></TextField>
        </div>
        <TextField
          ref={emailInputRef}
          name="email"
          id="email"
          isRequired
          label={t("authentication.signup.email.label")}
          type="text"
          className="flex flex-col"
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
        <DatePicker
          id="age"
          name="age"
          label={t("authentication.signup.age.label")}
          isRequired
          className="grid w-full"
        />
        <SelectFiled
          label={t("authentication.signup.gender.label")}
          name="gender"
          aria-label={t("authentication.signup.gender.label")}
          isRequired
          className="grid w-full content-start bg-primary-50"
        >
          {genders.map(({ key, value }) => (
            <ListBoxItem
              className="flex justify-between"
              key={key}
              id={value}
              textValue={genderNames[value]}
            >
              {({ isSelected }) => (
                <>
                  <span>{genderNames[value]}</span>
                  {isSelected ? (
                    <CheckIcon className="text-accent-500 w-4 h-4 group-hover:text-inherit" />
                  ) : null}
                </>
              )}
            </ListBoxItem>
          ))}
        </SelectFiled>
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
            {t("authentication.signup.button")}
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
      <div>
        <span className="text-xs">
          {t("authentication.footer.signup.title")}{" "}
        </span>
        <Link className="text-accent-100" href="/login">
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
        {errors && errors.message && (
          <BoxAlert
            variant="negative"
            title={errors.XErrorType ?? "AccountIsExist"}
            body={errors.message}
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
