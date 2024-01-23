import BoxAlert from "@components/BoxAlert";
import Button from "@components/Button";
import Form from "@components/Form";
import Modal from "@components/Modal";
import ProgressCircle from "@components/ProgressCricle";
import TextField from "@components/TextField";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { hookDispatch } from "@lib/hook/ReduxHook";
import {
  LoginEmailVerification,
  SendMail,
  checkCodeConfirm,
} from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { TypeErrorAuthenticate } from "@lib/utils/typeErrorAuthentication";
import clsx from "clsx";
import { FormikHelpers } from "formik";
import { Ok, ResultAsync } from "neverthrow";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";

// let timer: ReturnType<typeof setTimeout>;
function ConfirmAccount() {
  const { email } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = hookDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [timeLogin, setTimeLogin] = useState<boolean>(false);
  const [timeLoading, setTimeLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [timeDisplayBox, setTimeDisplayBox] = useState<boolean>(false);
  const [alertBox, setAlertBox] = useState({
    message: "",
    XErrorType: "",
  });
  const [errLogin, setErrLogin] = useState<string>("");
  useEffect(() => {
    if (!email) {
      navigate("/error/authenticatedError");
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (errMessage !== "") {
        setErrMessage("");
      }
    }, 1500);
    return clearTimeout(timer);
  }, [errMessage]);

  function handleSendMailAgain() {
    const values = {
      email: email + ".com",
    };
    setTimeDisplayBox(true);
    dispatch(SendMail(values)).then((e) => {
      const result = e.payload as Ok<
        Response,
        void | Error | ApiError | ResultAsync<never, ApiError>
      >;
      if (result.isOk()) {
        setAlertBox((e) => ({
          ...e,
          message: t("authentication.codeconfirm.responseOk"),
          XErrorType: "Ok",
        }));
      }
      if (result.isErr() && result.error instanceof ApiError) {
        const apiError = result.error as ApiError;
        setAlertBox((e) => ({
          ...e,
          message: apiError.details.errors?.message!,
          XErrorType: apiError.details.errors?.XErrorType!,
        }));
      }
      setTimeout(() => {
        setTimeDisplayBox(false);
      }, 2500);
    });
  }
  function handleLoginEmailVerification() {
    const values = {
      email: email + ".com",
    };
    setTimeLogin(true);
    dispatch(LoginEmailVerification(values)).then((e) => {
      const result = e.payload as Ok<
        Response,
        void | Error | ApiError | ResultAsync<never, ApiError>
      >;
      if (result.isOk()) {
        navigate("/");
      }
      if (result.isErr()) {
        setErrLogin("something is wronng, please try again!!!!");
      }
      setTimeout(() => {
        setTimeLogin(false);
      }, 2500);
    });
  }
  return (
    <div className="h-screen bg-primary-100 w-full flex justify-center items-center">
      <div className="w-[33rem] rounded-md shadow-lg bg-primary-50 relative">
        <div className="border border-b-primary-400 border-r-0 p-4 border-l-0 border-t-0 border-solid">
          <h3 className="font-medium m-0">
            {t("authentication.codeconfirm.title")}
          </h3>
        </div>
        <div className="w-80% p-4">
          <Trans
            t={t}
            i18nKey={"authentication.codeconfirm.text"}
            values={{ email }}
          >
            {t("authentication.codeconfirm.text")}
            <strong className="">{email}</strong>
          </Trans>
        </div>
        <Form
          initialValues={{ codeConfirm: "" }}
          onSubmit={(
            values: { codeConfirm: string; email: string },
            formikHelpers: FormikHelpers<any>
          ) => {
            values.email = email + ".com";
            setTimeLoading(true);
            dispatch(checkCodeConfirm(values)).then((e) => {
              const result = e.payload as Ok<
                Response,
                void | Error | ApiError | ResultAsync<never, ApiError>
              >;
              let apiError: ApiError;
              if (result.isErr() && result.error instanceof ApiError) {
                apiError = result.error as ApiError;
              }
              if (result.isOk()) {
                formikHelpers.resetForm();
                setIsOpen(true);
              }
              setTimeout(() => {
                setTimeLoading(false);
                setErrMessage(apiError.details.detail!.toString());
              }, 1000);
            });
          }}
          className="p-4 flex flex-col items-start gap-4 w-full"
        >
          <TextField
            name="codeConfirm"
            id="codeConfirm"
            label={t("authentication.codeconfirm.label")}
            inputClassName="py-2 text-base"
            labelClassName="text-base"
            errMessage={errMessage}
            onFocus={() => setErrMessage("")}
          ></TextField>
          <Button
            onPress={() => handleSendMailAgain()}
            className="bg-primary-50 text-accent-500 p-2 relative hover:bg-none rac-hover:bg-primary-100 rac-hover:shadow-sm"
          >
            <span
              className={clsx("block transition ease-in-out", {
                "opacity-0": timeDisplayBox === true,
                "scale-0": timeDisplayBox === true,
              })}
            >
              {t("authentication.codeconfirm.link")}
            </span>
            <Transition
              show={timeDisplayBox === true}
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
          <div className="w-full flex gap-4 justify-end">
            <Button
              variant="primary"
              className="p-2 bg-primary-100 text-primary-950 border border-solid border-primary-200 rac-hover:bg-primary-50 rac-focus:border-primary-300"
            >
              {t("authentication.codeconfirm.buttonPrimary")}
            </Button>
            <Button
              className="p-2 relative"
              type="submit"
              isDisabled={timeLoading}
            >
              <span
                className={clsx("block transition ease-in-out", {
                  "opacity-0": timeLoading === true,
                  "scale-0": timeLoading === true,
                })}
              >
                {t("authentication.codeconfirm.buttonAccent")}
              </span>
              <Transition
                show={timeLoading === true}
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
        </Form>
        <Transition
          show={timeDisplayBox}
          className="flex flex-col gap-6 w-full absolute -bottom-48"
          enter="transition ease-in-out"
          enterFrom="opacity-0 scale-0"
          leave="transition ease-in-out duration-300"
          leaveTo="opacity-0 scale-0"
        >
          {alertBox.XErrorType !== "" ? (
            <BoxAlert
              variant={
                TypeErrorAuthenticate(alertBox.XErrorType)
                  ? "positive"
                  : "negative"
              }
              title={alertBox.XErrorType}
              body={alertBox.message}
              className="bg-primary-50"
            ></BoxAlert>
          ) : null}
        </Transition>
        <Modal isExistingButotn={false} isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold leading-6 m-0 text-primary-400">
                {t("authentication.codeconfirm.modal.title")}
              </h3>
              <CheckCircleIcon className="w-5 h-5 text-positive-500" />
            </div>
            <p className="mt-3 text-primary-300 text-xs">
              {t("authentication.codeconfirm.modal.text")}
            </p>
            <div
              className={clsx("mt-6 flex justify-end items-center", {
                "justify-between": errLogin !== "",
              })}
            >
              {errLogin ? (
                <p className="text-xs text-negative-500">{errLogin}</p>
              ) : null}
              <div className="flex justify-end">
                <Button
                  className="px-3 py-2 relative"
                  onPress={() => handleLoginEmailVerification()}
                >
                  <span
                    className={clsx("block transition ease-in-out", {
                      "opacity-0": timeLogin === true,
                      "scale-0": timeLogin === true,
                    })}
                  >
                    Ok
                  </span>
                  <Transition
                    show={timeLogin === true}
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
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ConfirmAccount;
