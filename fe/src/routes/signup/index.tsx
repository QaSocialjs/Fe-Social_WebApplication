import React from "react";
import LayoutAuthentication from "../../lib/layouts/layout-authentication";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import FormSignUp from "./FormSignUp";
import i18n from "@lib/i18n/i18n";
import Logo from "@components/Logo";
import { addYears, format } from "date-fns";
const email_regex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export type SignUpType = {
  email: string;
  password: string;
  confirmpassword: string;
  firstName: string;
  lastName: string;
  age: Date;
  gender: number;
};

export const getSignupFormSchema = (): Yup.ObjectSchema<SignUpType> => {
  const maxDate = addYears(new Date(), -13);
  return Yup.object().shape({
    firstName: Yup.string().required(
      i18n.t("authentication.signup.firstname.required")
    ),
    lastName: Yup.string().required(
      i18n.t("authentication.signup.lastname.required")
    ),
    age: Yup.date()
      .max(maxDate, () =>
        i18n.t("authentication.signup.age.max", {
          date: format(maxDate, "yyyy-MM-dd"),
        })
      )
      .required(i18n.t("authentication.signup.age.required")),
    gender: Yup.number()
      .oneOf([1, 2], i18n.t("authentication.signup.gender.invalid"))
      .required(i18n.t("authentication.signup.gender.required")),
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
};

export default function SignUp(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <LayoutAuthentication className="bg-primary-50 w-full overflow-auto py-10">
      <div className="flex flex-col justify-center items-center">
        <div className="w-fit mx-auto flex gap-6 h-full flex-col">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-primary-700 font-bold m-0 tracking-wider">
                {t("authentication.signup.header.title")}
              </h2>
              <div className="text-primary-950 text-opacity-50 font-semibold">
                {t("authentication.signup.header.subtitle")}
              </div>
            </div>
            <Logo></Logo>
          </div>
          <hr className="w-full border border-solid border-primary-950 border-opacity-30" />
          <FormSignUp />
        </div>
        <div className="w-[28rem] flex flex-col gap-3 mt-2">
          <span className="text-xs text-primary-950 text-opacity-50 font-semibold">
            {t("authentication.footer.signup.note")}
          </span>
          <span className="text-xs text-primary-950 text-opacity-50 font-semibold">
            {t("authentication.footer.signup.policy")}
          </span>
        </div>
      </div>
    </LayoutAuthentication>
  );
}
