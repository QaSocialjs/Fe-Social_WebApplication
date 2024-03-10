import { FormikHelpers } from "formik";
import Form from "@components/Form";
import TextField from "@components/TextField";
import Checkbox from "@components/Checkbox";
import PasswordField from "@components/PasswordField";
import Link from "@components/Link";
import Button from "@components/Button";
import { Login } from "@lib/redux/user/UserThunk";
import { hookDispatchThunk } from "@lib/hook/ReduxHook";
import { useSelector } from "react-redux";
import { RootState } from "@lib/redux/Store";
import { ApiError } from "@lib/services/ErrorApi";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@components/ProgressCricle";
import BoxAlert from "@components/BoxAlert";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getLoginFormSchema } from ".";
import i18n from "@lib/i18n/i18n";
import { useTranslation } from "react-i18next";
import { Ok, ResultAsync } from "neverthrow";
import { TypeErrorAuthenticate } from "@lib/utils/typeErrorAuthentication";
import Modal from "@components/Modal";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
function Formlogin() {
  const dispatch = hookDispatchThunk();
  const [timeErr, setTimeErr] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const schema = useMemo(() => getLoginFormSchema(), [i18n.language]);
  const [timeSwitchPage, setTimeSwitchPage] = useState<boolean>(false);
  const [timeSuccess, setTimeSuccess] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, errors, success } = useSelector(
    (state: RootState) => ({
      loading: state.user.loading,
      errors: state.user.errors,
      success: state.user.success,
    }),
    (prev, curr) => prev.loading === curr.loading && prev.errors === curr.errors
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
  function handleConfirmMail() {
    setTimeout(
      () => {
        setTimeSwitchPage(false);
        navigate(`/confirmCode/${emailInputRef.current?.value.split(".")[0]}`);
      },

      1000
    );
    setTimeSwitchPage(true);
  }
  return (
    <div className="w-[25rem] flex flex-col gap-6">
      <Form
        className="flex flex-col gap-6 w-full"
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          dispatch(Login({ ...values })).then((e) => {
            const result = e.payload as Ok<
              Response,
              void | Error | ApiError | ResultAsync<never, ApiError>
            >;
            if (result.isErr() && result.error instanceof ApiError) {
              const apiError = result.error as ApiError;
              console.log(
                TypeErrorAuthenticate(apiError.details.errors?.XErrorType!)
              );
              if (
                TypeErrorAuthenticate(apiError.details.errors?.XErrorType!) ===
                -1
              ) {
                setIsOpen(true);
              }
            } else {
              formikHelpers.resetForm();
              setTimeout(() => {
                navigate("/");
              }, 1600);
            }
          });
        }}
      >
        <TextField
          ref={emailInputRef}
          name="email"
          id="email"
          isRequired
          label={t("authentication.login.email.label")}
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
          label={t("authentication.login.password.label")}
          type="password"
          className="flex flex-col"
          inputClassName="text-base font-bold py-3 bg-primary-100"
          labelClassName="text-base"
        ></PasswordField>
        <div className="flex justify-between">
          <Checkbox
            className="flex gap-x-2 items-center w-fit"
            isSelected={true}
          >
            <div>Remember me</div>
          </Checkbox>
          <Link className="text-accent-300 decoration-3 decoration-accent-300">
            Forgot password?
          </Link>
        </div>
        <Button
          className="w-full py-3 rounded-full relative"
          type="submit"
          isDisabled={loading === true}
        >
          <span
            className={clsx("block transition ease-in-out", {
              "opacity-0": loading === true,
              "scale-0": loading === true,
            })}
          >
            Login
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
          {t("authentication.footer.login.title")}{" "}
        </span>
        <Link href="/signup" className="text-accent-300">
          {t("authentication.footer.login.link")}
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
            title={errors.XErrorType}
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
          body={t("authentication.login.success")}
        ></BoxAlert>
      </Transition>

      <Modal isExistingButotn={false} isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex justify-between p-6">
          <h3 className="font-semibold leading-6 m-0 text-primary-400">
            Unconfirmed email.
          </h3>
          <ExclamationCircleIcon className="w-5 h-5 text-negative-500" />
        </div>
        <div className="px-6">
          <p className="mt-3 text-primary-300 text-xs">
            {t("authentication.login.confirmEmail.text")}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-2 p-6">
          <Button
            onPress={() => setIsOpen(false)}
            className="bg-primary-100 text-primary-950 border border-solid border-primary-200 transition-colors"
            variant="primary"
          >
            {t("authentication.login.confirmEmail.buttonCancel")}
          </Button>
          <Button
            onPress={handleConfirmMail}
            className="p-2 relative transition-colors focus-visible:ring-2 ring-accent-200 ring-offset-2"
            isDisabled={timeSwitchPage === true}
          >
            <span
              className={clsx("block transition ease-in-out", {
                "opacity-0": timeSwitchPage === true,
                "scale-0": timeSwitchPage === true,
              })}
            >
              {t("authentication.login.confirmEmail.buttonSend")}
            </span>
            <Transition
              show={timeSwitchPage === true}
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
        </div>
      </Modal>
    </div>
  );
}

export default Formlogin;
