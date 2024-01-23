import Button from "@components/Button";
import DatePicker from "@components/DatePicker";
import Form from "@components/Form";
import ListBoxItem from "@components/ListBoxItem";
import SelectFiled from "@components/SelectFiled";
import {
  CakeIcon,
  CheckIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { UseUserContext } from "@lib/context/usercontext";
import { hookDispatch } from "@lib/hook/ReduxHook";
import i18n from "@lib/i18n/i18n";
import { User, genderNames, genders } from "@lib/models/User";
import { UpdateUser, getUserId } from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { TypeErrorAuthenticate } from "@lib/utils/typeErrorAuthentication";
import { getStringGender } from "@lib/utils/utils";
import { addYears, format } from "date-fns";
import { FormikHelpers } from "formik";
import { Ok, ResultAsync } from "neverthrow";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
export type typeGender = {
  genderEdit: number;
};
export type typeAge = {
  ageEdit: Date;
};
export const getGenderSchema = (): Yup.ObjectSchema<typeGender> =>
  Yup.object().shape({
    genderEdit: Yup.number()
      .oneOf([1, 2], i18n.t("profile.about.contactandinfo.gender.invalid"))
      .required(i18n.t("profile.about.contactandinfo.gender.required")),
  });
export const getAgeSchema = (): Yup.ObjectSchema<typeAge> => {
  const maxDate = addYears(new Date(), -13);
  return Yup.object().shape({
    ageEdit: Yup.date()
      .max(maxDate, () =>
        i18n.t("authentication.signup.age.max", {
          date: format(maxDate, "yyyy-MM-dd"),
        })
      )
      .required(i18n.t("authentication.signup.age.required")),
  });
};
function BasicInfor() {
  const { user, setIsLoading } = UseUserContext();
  const { id } = useParams();
  const dispatch = hookDispatch();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const schemaGender = useMemo(() => getGenderSchema(), [i18n.language]);
  const schemaAge = useMemo(() => getAgeSchema(), [i18n.language]);
  const [isEditGender, setIsEditGender] = useState<boolean>(false);
  const [isEditAge, setIsEditAge] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAge, setLoadingAge] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;
    if (user.id === id) {
      setUserProfile(user);
      setIsCurrentUser(true);
    } else {
      dispatch(getUserId({ id: id! })).then(async (e) => {
        const response = e.payload as Ok<
          Response,
          void | Error | ApiError | ResultAsync<never, ApiError>
        >;
        if (response.isErr()) {
          navigate("/error/authenticatedError");
        }
        if (response.isOk()) {
          setUserProfile((await response.value.json()) as User);
        }
      });
    }
  }, [user]);
  return (
    <div className="">
      {isCurrentUser ? (
        <div className="flex flex-col gap-6">
          {isEditGender ? (
            <Form
              initialValues={{ genderEdit: -1 }}
              className="w-full"
              validationSchema={schemaGender}
              onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
                setLoading(true);
                dispatch(
                  UpdateUser({
                    id: id!,
                    gender: values.genderEdit,
                  })
                ).then((e: any) => {
                  const result = e.payload as Ok<
                    Response,
                    void | Error | ApiError | ResultAsync<never, ApiError>
                  >;
                  if (result.isErr() && result.error instanceof ApiError) {
                    const apiError = result.error as ApiError;
                    if (
                      !TypeErrorAuthenticate(
                        apiError.details.errors?.XErrorType!
                      )
                    ) {
                      setIsEditGender(true);
                    }
                  } else {
                    setIsLoading(true);
                    setIsEditGender(false);
                    formikHelpers.resetForm();
                  }
                  setLoading(false);
                });
              }}
            >
              <SelectFiled
                name="genderEdit"
                aria-label={"genderEdit"}
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
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  type="button"
                  className="py-2 bg-primary-300 bg-opacity-20 text-primary-950"
                  variant="primary"
                  onPress={() => setIsEditGender(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="py-2"
                  isDisabled={loading === true}
                >
                  Save
                </Button>
              </div>
            </Form>
          ) : (
            <div className="w-full justify-between flex items-center">
              <div className="flex items-center">
                <UserCircleIcon className="h-10 aspect-square" />
                <div className="flex flex-col">
                  <p className="text-base font-bold p-0 m-0">
                    {getStringGender(userProfile?.gender!)}
                  </p>
                  <span className="p-0 text-xs font-medium text-primary-500 text-opacity-60">
                    gender
                  </span>
                </div>
              </div>
              <div>
                <Button
                  className="bg-primary-300 bg-opacity-30 border-4 rounded-full px-2 mt-0 hover:bg-opacity-20"
                  variant="primary"
                  onPress={() => setIsEditGender(true)}
                >
                  <PencilIcon className="h-5 aspect-square mt-2 text-primary-800" />
                </Button>
              </div>
            </div>
          )}
          {isEditAge ? (
            <Form
              initialValues={{ ageEdit: "" }}
              className="w-full"
              validationSchema={schemaAge}
              onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
                setLoadingAge(true);
                dispatch(
                  UpdateUser({
                    id: id!,
                    age: values.ageEdit,
                  })
                ).then((e: any) => {
                  const result = e.payload as Ok<
                    Response,
                    void | Error | ApiError | ResultAsync<never, ApiError>
                  >;
                  if (result.isErr() && result.error instanceof ApiError) {
                    const apiError = result.error as ApiError;
                    if (
                      !TypeErrorAuthenticate(
                        apiError.details.errors?.XErrorType!
                      )
                    ) {
                      setIsEditAge(true);
                    }
                  } else {
                    setIsLoading(true);
                    setIsEditAge(false);
                    formikHelpers.resetForm();
                  }
                  setLoadingAge(false);
                });
              }}
            >
              <DatePicker
                id="ageEdit"
                name="ageEdit"
                aria-label="ageEdit"
                isRequired
                className="grid w-full"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  type="button"
                  className="py-2 bg-primary-300 bg-opacity-20 text-primary-950"
                  variant="primary"
                  onPress={() => setIsEditAge(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="py-2"
                  isDisabled={loadingAge === true}
                >
                  Save
                </Button>
              </div>
            </Form>
          ) : (
            <div className="w-full justify-between flex items-center">
              <div className="flex items-center">
                <CakeIcon className="h-10 aspect-square" />
                <div className="flex flex-col">
                  <p className="text-base font-bold p-0 m-0">
                    {userProfile?.age!}
                  </p>
                  <span className="p-0 text-xs font-medium text-primary-500 text-opacity-60">
                    Birth date
                  </span>
                </div>
              </div>
              <div>
                <Button
                  className="bg-primary-300 bg-opacity-30 border-4 rounded-full px-2 mt-0 hover:bg-opacity-20"
                  variant="primary"
                  onPress={() => setIsEditAge(true)}
                >
                  <PencilIcon className="h-5 aspect-square mt-2 text-primary-800" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default BasicInfor;
