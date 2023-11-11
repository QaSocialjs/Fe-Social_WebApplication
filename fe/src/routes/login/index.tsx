import React from "react";
import LayoutAuthentication from "../../lib/layouts/layout-authentication";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { t } from "i18next";
import Link from "../../lib/components/Link";
import Formlogin from "./Formlogin";

const email_regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(t("authentication.login.email.required"))
    .matches(email_regex, t("authentication.login.email.invalid")),
  password: Yup.string()
    .required("Required")
    .min(8, t("authentication.login.password.invalid")),
});

export default function Login(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <LayoutAuthentication className="grid grid-cols-[3fr_2fr] h-screen overflow-hidden">
      <div className="h-full w-full flex items-center">
        <div className="absolute flex flex-col justify-between h-[90%] px-14 z-40">
          <h1 className="font-bold text-[2.7rem] break-all w-[18rem] text-primary-900 z-40 text-opacity-80">
            Smash sets in your sweats.
          </h1>

          <h1 className="font-bold text-[2.7rem] break-all w-[18rem] text-primary-100 text-opacity-90">
            MTABOI
          </h1>
        </div>
        <div className="w-full h-full bg-img object-cover relative"></div>
      </div>
      <div className="h-full w-full bg-primary-50">
        <div className="w-fit mx-auto flex gap-6 py-12 h-full flex-col">
          <h3 className="text-primary-700 font-bold m-0">
            {t("authentication.login.header")}
          </h3>
          <Formlogin />
          <div className="flex items-center justify-between">
            <hr className="w-[40%] h-[1.2px] bg-primary-300 outline-none border-none" />
            <span className="text-xs text-primary-300 font-bold">
              Other hand
            </span>
            <hr className="w-[40%] h-[1.2px] bg-primary-300 outline-none border-none" />
          </div>
          <div>
            <span className="text-xs">Dont have account? </span>
            <Link className="text-accent-300">Create New Accout?</Link>
          </div>
        </div>
      </div>
    </LayoutAuthentication>
  );
}
