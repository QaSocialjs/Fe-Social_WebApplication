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
import { Work } from "@lib/models/Work";
import { CreatWork } from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { TypeErrorAuthenticate } from "@lib/utils/typeErrorAuthentication";
import clsx from "clsx";
import { FormikHelpers } from "formik";
import { Ok, ResultAsync } from "neverthrow";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
export type FormAddWorkProps = {
  setIsAddWork: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
export type typeWork = {
  company: string;
  checkTermSchedule: boolean;
  start: Date | null | undefined;
  end: Date | null | undefined;
};
export const getSchemaAddWork = (): Yup.ObjectSchema<typeWork> =>
  Yup.object().shape({
    company: Yup.string().required(
      i18n.t("profile.about.workandeducation.work.required")
    ),
    checkTermSchedule: Yup.boolean().default(true),
    start: Yup.date()
      .when("checkTermSchedule", {
        is: (checkTermSchedule: boolean) => {
          return !!checkTermSchedule ? false : true;
        },
        then: (schema) => schema.required("Start Date/Time is required"),
      })
      .nullable(),
    end: Yup.date()
      .min(
        Yup.ref("start"),
        i18n.t("profile.about.workandeducation.end.invalid")
      )
      .nullable(),
  });

export function FormAddWork({ setIsAddWork, setIsLoading }: FormAddWorkProps) {
  const dispatch = hookDispatch();
  const navigate = useNavigate();
  const schema = useMemo(() => getSchemaAddWork(), [i18n.language]);
  const [loading, setLoading] = useState<boolean>(false);
  const [companyValue, setCompanyValue] = useState<string | null>(null);
  const [postionValue, setPositionValue] = useState<string | null>(null);
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
                console.log(i);
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
        company: "",
        position: "",
        checkTermSchedule: true,
        start: "",
        end: "",
      }}
      className="w-full grid gap-2"
      validationSchema={schema}
      isOnblur={false}
      onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
        setLoading(true);
        dispatch(
          CreatWork({
            id: id!,
            work: {
              company: companyValue!,
              position: postionValue!,
            },
            startWork: selection ? new Date() : values.start,
            endWork: selection ? new Date() : values.end,
          })
        ).then((e: any) => {
          const result = e.payload as Ok<
            Response,
            void | Error | ApiError | ResultAsync<never, ApiError>
          >;
          if (result.isErr() && result.error instanceof ApiError) {
            const apiError = result.error as ApiError;
            if (
              TypeErrorAuthenticate(apiError.details.errors?.XErrorType!) === 2
            ) {
              navigate("/login");
            }
          } else {
            setIsLoading(true);
            formikHelpers.resetForm();
          }
          setLoading(false);
        });
      }}
    >
      <TextField
        name="company"
        id="company"
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
        name="position"
        id="position"
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
          name="checkTermSchedule"
          id="checkTermSchedule"
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
          name="start"
          aria-label="start"
          label="Start time"
          className="grid w-full"
        />
        <DatePicker
          name="end"
          aria-label="end"
          label="End time"
          className="grid w-full"
        />
      </Transition>
      <div className="flex justify-end gap-2 mt-2">
        <Button
          type="button"
          className="py-2 bg-primary-300 bg-opacity-20 text-primary-950"
          variant="primary"
          onPress={() => setIsAddWork(false)}
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

export default FormAddWork;
