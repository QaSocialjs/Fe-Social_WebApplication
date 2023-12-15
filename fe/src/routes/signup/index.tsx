import React from "react";
import LayoutAuthentication from "../../lib/layouts/layout-authentication";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import FormSignUp from "./FormSignUp";
import i18n from "@lib/i18n/i18n";
const email_regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type SignUpType = {
  email: string;
  password: string;
  confirmpassword: string;
};

export const getLoginFormSchema = (): Yup.ObjectSchema<SignUpType> =>
  Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("authentication.signup.email.invalid"))
      .required(i18n.t("authentication.signup.email.required"))
      .matches(email_regex, i18n.t("authentication.signup.email.invalid")),
    password: Yup.string()
      .required(i18n.t("authentication.signup.password.required"))
      .min(8, i18n.t("authentication.signup.password.invalid")),
    confirmpassword: Yup.string()
      .required(i18n.t("authentication.signup.confirmpassword.required"))
      .oneOf(
        [Yup.ref("password")],
        i18n.t("authentication.signup.confirmpassword.invalid")
      ),
  });

export default function SignUp(): React.ReactElement {
  const { t } = useTranslation();
  console.log(t("authentication.signup.password.required"));
  return (
    <LayoutAuthentication className="h-screen bg-primary-50 overflow-auto">
      <div className="flex justify-center items-center ">
        <div className="w-fit mx-auto flex gap-6 py-12 h-full flex-col">
          <h3 className="text-primary-700 font-bold m-0">
            {t("authentication.signup.header")}
          </h3>
          <FormSignUp />
        </div>
      </div>
    </LayoutAuthentication>
  );
}
