import { UseUserContext } from "@lib/context/usercontext";
import { hookDispatch } from "@lib/hook/ReduxHook";
import { User } from "@lib/models/User";
import {
  DeleteCityUser,
  UpdateUser,
  getUserId,
} from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { Ok, ResultAsync } from "neverthrow";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import i18n from "@lib/i18n/i18n";
import Form from "@components/Form";
import { FormikHelpers } from "formik";
import TextField from "@components/TextField";
import Button from "@components/Button";
import {
  EllipsisHorizontalIcon,
  GlobeAltIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useDedoncyEffectHook } from "@lib/hook/useDoucyHook";
import ListBoxItem from "@components/ListBoxItem";
import { Listbox } from "@components/Listbox";
import clsx from "clsx";
import { TypeErrorAuthenticate } from "@lib/utils/typeErrorAuthentication";
import { DialogTrigger, ListBox } from "react-aria-components";
import Popover from "@components/Popover";
import { formatDate } from "@lib/utils/date";
export type PlaceLiveProps = {
  nameCity: string;
};
export const getPlaceLiveSchema = (): Yup.ObjectSchema<PlaceLiveProps> =>
  Yup.object().shape({
    nameCity: Yup.string().required(
      i18n.t("profile.about.placelived.required")
    ),
  });
function PlaceLive() {
  const [countryData, setCountryData] = useState([]);
  const { user, setIsLoading } = UseUserContext();
  const { id } = useParams();
  const dispatch = hookDispatch();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const schema = useMemo(() => getPlaceLiveSchema(), [i18n.language]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isloadingDelete, setIsloadingDelete] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const [editPlacelived] = useState([
    {
      icon: <PencilIcon className="h-5 aspect-square" />,
      text: "Edit town or city",
      action: "edit",
    },
    {
      icon: <TrashIcon className="h-5 aspect-square" />,
      text: "Delete",
      action: "delete",
    },
  ]);
  const fetchCountryData = (name: string) => {
    try {
      fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then((r) => r.json())
        .then((r) => {
          setCountryData(r);
        });
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useDedoncyEffectHook(
    () => {
      if (inputValue !== "") fetchCountryData(inputValue);
    },
    800,
    [inputValue]
  );
  useEffect(() => {
    if (!user) return;
    if (user.id === id) {
      setUserProfile(user);
      setIsCurrentUser(true);
      setIsEdit(false);
      setCountryData([]);
      setInputValue("");
      // ref.current!.value = "";
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
          setIsEdit(false);
          setCountryData([]);
          setInputValue("");
          ref.current!.value = "";
        }
      });
    }
  }, [user]);
  const handleInputChange = (event: string) => {
    setInputValue(event);
    if (event === "" || !event) {
      setCountryData([]);
    }
  };
  function handleEdit() {
    setIsEdit(true);
  }
  function handleDelete() {
    setIsloadingDelete(true);
    dispatch(DeleteCityUser({ id })).then((e) => {
      const response = e.payload as Ok<
        Response,
        void | Error | ApiError | ResultAsync<never, ApiError>
      >;
      console.log(response);
      if (response.isErr()) {
        navigate("/error/authenticatedError");
      }
      if (response.isOk()) {
        setIsLoading(true);
      }
      setIsloadingDelete(false);
    });
  }
  function handleAction(action: string) {
    if (action === "edit") {
      handleEdit();
    } else {
      handleDelete();
    }
  }

  return (
    <div className="px-6 py-2 w-full flex flex-col">
      <h4 className="text-base font-semibold">Place lived</h4>
      {isCurrentUser ? (
        <div className="w-full">
          {isEdit ? (
            <Form
              initialValues={{ nameCity: "" }}
              validationSchema={schema}
              onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
                setLoading(true);
                dispatch(
                  UpdateUser({
                    id: id!,
                    city: {
                      nameCity: inputValue,
                      time: new Date(),
                    },
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
                      setIsEdit(true);
                      setCountryData([]);
                      setInputValue("");
                      ref.current!.value = "";
                    }
                  } else {
                    setIsLoading(true);
                    formikHelpers.resetForm();
                  }
                  setLoading(false);
                });
              }}
              isOnblur={false}
              className="grid gap-4"
            >
              <TextField
                type="text"
                name="nameCity"
                label="NameCity"
                inputClassName="text-base font-bold py-2 bg-primary-100"
                labelClassName="text-base"
                ref={ref}
                value={inputValue}
                onChange={handleInputChange}
              ></TextField>

              <Listbox
                aria-label="country"
                className={clsx("shadow-md rounded-md", {
                  "border border-solid border-primary-300":
                    countryData.length > 0,
                })}
              >
                {(countryData as any[])?.map((item, index) => (
                  <ListBoxItem
                    key={index}
                    textValue={item.name.common}
                    aria-label="countryItem"
                    className="flex gap-2 p-[0.5rem] items-center hover:bg-black hover:bg-opacity-5"
                  >
                    <span
                      className="w-full"
                      onClick={() => {
                        if (ref.current) {
                          ref.current.value = item.name.common;
                          setInputValue(item.name.common);
                        }
                        setCountryData([]);
                      }}
                    >
                      {item.name.common}
                    </span>
                  </ListBoxItem>
                ))}
              </Listbox>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  className="py-2 bg-primary-300 bg-opacity-20 text-primary-950"
                  variant="primary"
                  onPress={() => setIsEdit(false)}
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
          ) : userProfile?.city?.nameCity ? (
            <div className="w-full justify-between items-center flex">
              <div className="flex gap-2 items-center">
                <GlobeAltIcon className="h-10 aspect-square"></GlobeAltIcon>
                <div className="flex flex-col">
                  <span className="tracking-wide font-medium">
                    Come from:
                    {userProfile?.city.nameCity}
                  </span>
                  <span className="text-xs font-medium text-primary-950 text-opacity-70">
                    time: {formatDate(userProfile.city.time.toString())}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <DialogTrigger>
                  <Button
                    className="absolute bg-primary-200 bg-opacity-50 border-4 rounded-full px-1 py-0 mt-0"
                    variant="primary"
                  >
                    <EllipsisHorizontalIcon className="h-7 aspect-square text-primary-950 mt-1" />
                  </Button>
                  <Popover className="w-[18vw] z-50">
                    <ListBox aria-label="1">
                      {editPlacelived.map(({ text, icon, action }, idex) => (
                        <ListBoxItem
                          key={idex}
                          id={text}
                          textValue={text}
                          aria-label="1"
                          className="flex gap-2 p-[0.5rem] items-center hover:bg-black hover:bg-opacity-5"
                        >
                          <Button
                            variant="primary"
                            className="w-full h-full text-left flex items-center py-1 px-1 gap-2 bg-transparent text-primary-950"
                            onPress={() => handleAction(action)}
                            isDisabled={isloadingDelete}
                          >
                            {icon}
                            <span className="mt-1">{text}</span>
                          </Button>
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                </DialogTrigger>
              </div>
            </div>
          ) : (
            <Button
              className="flex gap-2 items-center py-2"
              onPress={() => setIsEdit(true)}
            >
              <PlusCircleIcon className="h-7 aspect-square"></PlusCircleIcon>
              <span className="">Add city</span>
            </Button>
          )}
        </div>
      ) : userProfile ? (
        <div>Hcm</div>
      ) : null}
    </div>
  );
}

export default PlaceLive;
