import Button from "@components/Button";
import Form from "@components/Form";
import TextField from "@components/TextField";
import {
  PencilIcon,
  PhoneArrowDownLeftIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useBoxAlertContext } from "@lib/context/BoxAlertcontext";
import { UseUserContext } from "@lib/context/usercontext";
import { hookDispatch } from "@lib/hook/ReduxHook";
import i18n from "@lib/i18n/i18n";
import { User } from "@lib/models/User";
import { UpdateUser, getUserId } from "@lib/redux/user/UserThunk";
import { TypeOfResponse } from "@lib/utils/utils";
import { FormikHelpers } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
export type typePhone = {
  phone: number;
};
export const getPhoneSchema = (): Yup.ObjectSchema<typePhone> =>
  Yup.object().shape({
    phone: Yup.number().required(
      i18n.t("profile.about.contactandinfo.gender.required")
    ),
  });
function ContactInfo() {
  const { id } = useParams();
  const dispatch = hookDispatch();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [isEditContact, setIsEditContact] = useState<boolean>(false);
  const { user, setIsLoading } = UseUserContext();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const schemaPhone = useMemo(() => getPhoneSchema(), [i18n.language]);
  const { setBody, setIsShowing, setTitle, setVariant } = useBoxAlertContext();
  useEffect(() => {
    if (!user) return;
    if (user.id === id) {
      setUserProfile(user);
      setIsCurrentUser(true);
    } else {
      dispatch(getUserId({ id: id! })).then(async (e: any) => {
        const result = TypeOfResponse(e);
        if (result.isErr()) {
          navigate("/error/authenticatedError");
        }
        if (result.isOk()) {
          setUserProfile((await result.value.json()) as User);
        }
      });
    }
  }, [user]);
  const handleInputChange = (event: string) => {
    setInputValue(event);
  };
  return (
    <div>
      <div className="">
        {isCurrentUser ? (
          <div className="flex flex-col gap-6">
            {isEditContact ? (
              <Form
                initialValues={{ phone: 0 }}
                className="w-full gap-2 flex flex-col"
                validationSchema={schemaPhone}
                onSubmit={(
                  values: { phone: number },
                  formikHelpers: FormikHelpers<any>
                ) => {
                  setLoading(true);
                  dispatch(
                    UpdateUser({
                      id: id!,
                      phone: values.phone,
                    })
                  ).then(async (e: any) => {
                    setIsShowing(true);
                    const result = TypeOfResponse(e.payload);
                    result.match(
                      (ok) => {
                        setTitle("Ok");
                        setBody("Update number successfully");
                        setVariant("positive");
                      },
                      (err) => {
                        setTitle("Failure");
                        setBody("Update number failure");
                        setVariant("negative");
                      }
                    );
                    setIsLoading(true);
                    setLoading(false);
                    setIsEditContact(false);
                    formikHelpers.resetForm();
                  });
                }}
              >
                <TextField
                  type="text"
                  name="phone"
                  label="Phone"
                  inputClassName="text-base font-bold py-2 bg-primary-100"
                  labelClassName="text-base"
                  ref={ref}
                  value={inputValue}
                  onChange={handleInputChange}
                ></TextField>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    className="py-2 bg-primary-300 bg-opacity-20 text-primary-950"
                    variant="primary"
                    onPress={() => setIsEditContact(false)}
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
              <div>
                {user?.phone ? (
                  <div className="w-full justify-between items-center flex">
                    <div className="flex gap-2 items-center">
                      <PhoneArrowDownLeftIcon className="h-8 aspect-square"></PhoneArrowDownLeftIcon>
                      <div className="flex flex-col">
                        <span className="tracking-wide font-medium">
                          {user?.phone}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Button
                        className="bg-primary-300 bg-opacity-30 border-4 rounded-full px-2 mt-0 hover:bg-opacity-20"
                        variant="primary"
                        onPress={() => setIsEditContact(true)}
                      >
                        <PencilIcon className="h-5 aspect-square mt-2 text-primary-800" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    className="flex gap-2 items-center py-2"
                    onPress={() => setIsEditContact(true)}
                  >
                    <PlusCircleIcon className="h-7 aspect-square"></PlusCircleIcon>
                    <span className="">Add your phone</span>
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ContactInfo;
