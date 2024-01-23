import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import DatePicker from "@components/DatePicker";
import Form from "@components/Form";
import ListBoxItem from "@components/ListBoxItem";
import { Listbox } from "@components/Listbox";
import TextField from "@components/TextField";
import { Transition } from "@headlessui/react";
import { hookDispatch } from "@lib/hook/ReduxHook";
import { useDedoncyEffectHook } from "@lib/hook/useDoucyHook";
import i18n from "@lib/i18n/i18n";
import { User } from "@lib/models/User";
import { Work } from "@lib/models/Work";
import { UpdateUser } from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { TypeErrorAuthenticate } from "@lib/utils/typeErrorAuthentication";
import clsx from "clsx";
import { FormikHelpers } from "formik";
import { Ok, ResultAsync } from "neverthrow";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
export type FormAddWorkProps = {
  setIsEditWork: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  user: User;
};
export type typeWork = {
  companyEdit: string;
  checkTermScheduleEdit: boolean;
  startEdit: Date | null | undefined;
  endEdit: Date | null | undefined;
};
export const getSchemaEditWork = (): Yup.ObjectSchema<typeWork> =>
  Yup.object().shape({
    companyEdit: Yup.string().required(
      i18n.t("profile.about.workandeducation.work.required")
    ),
    checkTermScheduleEdit: Yup.boolean().default(true),
    startEdit: Yup.date()
      .when("checkTermScheduleEdit", {
        is: (checkTermScheduleEdit: boolean) => {
          return !!checkTermScheduleEdit ? false : true;
        },
        then: (schema) => schema.required("Start Date/Time is required"),
      })
      .nullable(),
    endEdit: Yup.date()
      .min(
        Yup.ref("start"),
        i18n.t("profile.about.workandeducation.end.invalid")
      )
      .nullable(),
  });

export function FormEditWork({
  setIsEditWork,
  setIsLoading,
  user,
}: FormAddWorkProps) {
  const dispatch = hookDispatch();
  const navigate = useNavigate();
  const schema = useMemo(() => getSchemaEditWork(), [i18n.language]);
  const [loading, setLoading] = useState<boolean>(false);
  const [companyValue, setCompanyValue] = useState<string | null>(
    user.work?.company!
  );
  const [postionValue, setPositionValue] = useState<string | null>(
    user.work?.position!
  );
  const [isFetch, setIsFetch] = useState<boolean>(true);
  const [listWork, setListWork] = useState<Work[]>([]);
  const [listCompany, setListCompany] = useState<{ company: string }[]>([]);
  const [listPostion, setListPostion] = useState<{ position: string }[]>([]);
  const [isShowPostion, setIsShowPostion] = useState<boolean>(false);
  const [selection, setIsSelection] = useState<boolean>(true);
  const refCompany = useRef<HTMLInputElement>(null);
  const refPostion = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { id } = useParams();
  useDedoncyEffectHook(
    () => {
      if (companyValue === null) return;
      if (!isFetch) return;
      fetch(
        `http://localhost:8080/api/v1/suggestionCompany?text=${companyValue}`
      )
        .then((r) => r.json())
        .then((r: Work[]) => {
          setListCompany(
            r
              .reduce((b: Work[], a) => {
                let i = b.findIndex((e) => e.company === a.company);
                if (i === -1) {
                  b.push(a);
                }
                return b;
              }, [])
              .map((e) => ({ company: e.company }))
          );

          setListWork(r);
        });
    },
    800,
    [companyValue]
  );

  function handleCompanyValue(e: string) {
    setCompanyValue(e);
  }
  function handlePostionValue(e: string) {
    setPositionValue(e);
  }
  return (
    <Form
      initialValues={{
        companyEdit: "",
        positionEdit: "",
        checkTermScheduleEdit: true,
        startEdit: "",
        endEdit: "",
      }}
      className="w-full grid gap-2"
      validationSchema={schema}
      isOnblur={false}
      onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
        console.log("asd");
        setLoading(true);
        dispatch(
          UpdateUser({
            id: id!,
            work: {
              company: companyValue!,
              position: postionValue!,
            },
            startWork: selection ? new Date() : values.startEdit,
            endWork: selection ? new Date() : values.endEdit,
          })
        ).then((e: any) => {
          const result = e.payload as Ok<
            Response,
            void | Error | ApiError | ResultAsync<never, ApiError>
          >;
          console.log(result);
          if (result.isErr() && result.error instanceof ApiError) {
            const apiError = result.error as ApiError;
            if (
              TypeErrorAuthenticate(apiError.details.errors?.XErrorType!) === 2
            ) {
              navigate("/login");
            }
          }
          if (result.isOk()) {
            setIsLoading(true);
            formikHelpers.resetForm();
            setIsEditWork(false);
          }
          setLoading(false);
        });
      }}
    >
      <TextField
        name="companyEdit"
        id="companyEdit"
        label={t("profile.about.workandeducation.work.label")}
        inputClassName="text-base font-bold py-2 bg-primary-100"
        labelClassName="text-base"
        value={companyValue ?? ""}
        onChange={handleCompanyValue}
        ref={refCompany}
        onFocus={() => {
          setIsFetch(true);
          setCompanyValue("");
        }}
        isDisabled
      />
      <Listbox
        aria-label="country"
        className={clsx("shadow-md rounded-md", {
          "border border-solid border-primary-300": listCompany.length > 0,
        })}
      >
        {(listCompany as any[])?.map(({ company }, index) => (
          <ListBoxItem
            key={index}
            textValue={company}
            aria-label="countryItem"
            className="flex gap-2 p-[0.5rem] items-center hover:bg-black hover:bg-opacity-5"
          >
            <span
              className="w-full"
              onClick={() => {
                if (refCompany.current) {
                  refCompany.current.value = company;
                  setCompanyValue(company);
                  setListPostion(
                    listWork
                      .filter(
                        (e) =>
                          e.company === refCompany.current!.value &&
                          e.position !== undefined
                      )
                      .map((e) => ({ position: e.position }))
                  );
                  setListWork([]);
                  setIsFetch(false);
                }

                setListCompany([]);
              }}
            >
              {company}
            </span>
          </ListBoxItem>
        ))}
      </Listbox>
      <TextField
        name="positionEdit"
        id="positionEdit"
        label={t("profile.about.workandeducation.position.label")}
        inputClassName="text-base font-bold py-2 bg-primary-100"
        labelClassName="text-base"
        ref={refPostion}
        onFocus={() => setIsShowPostion(true)}
        value={postionValue ?? ""}
        onChange={handlePostionValue}
      />
      <Listbox
        aria-label="country"
        className={clsx("shadow-md rounded-md", {
          "border border-solid border-primary-300": listCompany.length > 0,
        })}
      >
        {isShowPostion &&
          (listPostion as any[])?.map(({ position }, index) => (
            <ListBoxItem
              key={index}
              textValue={position}
              aria-label="countryItem"
              className="flex gap-2 p-[0.5rem] items-center hover:bg-black hover:bg-opacity-5"
            >
              <span
                className="w-full"
                onClick={() => {
                  if (refPostion.current) {
                    refPostion.current.value = position;
                    setPositionValue(position);
                  }
                  setListPostion([]);
                }}
              >
                {position}
              </span>
            </ListBoxItem>
          ))}
      </Listbox>
      <h4 className="text-base font-semibold m-0 p-0">Time Period</h4>
      <div className="flex items-center gap-2">
        <Checkbox
          isSelected={selection}
          onChange={setIsSelection}
          name="checkTermScheduleEdit"
          id="checkTermScheduleEdit"
        />
        <span>I current work here</span>
      </div>
      <Transition
        show={selection ? false : true}
        enter="transition ease-in-out"
        enterFrom="opacity-0 scale-0"
        leave="transition ease-in-out duration-300"
        leaveTo="opacity-0 scale-0"
        className="w-full grid gap-2"
      >
        <DatePicker
          name="startEdit"
          aria-label="startEdit"
          label="Start time"
          className="grid w-full"
        />
        <DatePicker
          name="endEdit"
          aria-label="endEdit"
          label="End time"
          className="grid w-full"
        />
      </Transition>
      <div className="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          className="py-2 bg-primary-300 bg-opacity-20 text-primary-950"
          variant="primary"
          onPress={() => setIsEditWork(false)}
        >
          Cancel
        </Button>

        <Button type="submit" className="py-2" isDisabled={loading === true}>
          Save
        </Button>
      </div>
    </Form>
  );
}

export default FormEditWork;
