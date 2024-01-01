import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import type { DatePickerProps, DateValue } from "react-aria-components";
import {
  DatePicker as AriaDatePicker,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Text,
} from "react-aria-components";
import Button from "./Button";
import Popover from "./Popover";
import Label from "./Label";
import { SwitchTransition } from "transition-hook";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@lib/utils/utils";
import { useFormContext } from "./Form";
interface Props extends DatePickerProps<DateValue> {
  name: string;
  label?: string;
  description?: string;
  errorMessage?: string;
  labelClassName?: string;
  inputClassName?: string;
}
const DatePicker = React.forwardRef(function DatePicker(
  {
    label,
    className,
    errorMessage,
    description,
    isInvalid,
    isRequired,
    ...props
  }: Props,
  ref
) {
  const [showError, setShowError] = useState<undefined | string | any>(
    undefined
  );
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormContext()! || {};
  useEffect(() => {
    if (touched && errors) {
      setShowError(touched[props?.name] && errors[props?.name]);
    }
  }, [touched, errors]);
  const invalid = !!showError;
  const groupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current = groupRef.current!.getElementsByTagName(`input`)[0];
  }, []);
  useEffect(() => {
    if (inputRef.current?.value) {
      setFieldValue(props.name, inputRef.current.value);
      setFieldTouched(props.name, true);
    }
  }, [inputRef.current?.value]);
  return (
    <AriaDatePicker
      {...props}
      isInvalid={isInvalid || invalid}
      isRequired={isRequired}
      className={cn("group focus-within:outline-none", className)}
      onBlur={() => {
        inputRef.current?.dispatchEvent(
          new Event("blur", { bubbles: true, cancelable: true })
        );
        setFieldTouched(props.name, true);
      }}
      onChange={(e) => setFieldValue(props.name, e)}
    >
      {label ? (
        <Label
          className={clsx(
            "cursor-default mb-0.5 text-base flex items-center gap-1 flex-wrap",
            { "text-negative-300": showError }
          )}
        >
          {label}
          {isRequired ? (
            <span className="text-primary-950 text-xs font-medium">*</span>
          ) : null}
          {/* {props.isReadOnly ? (
            <span className="text-info-500 text-xs font-medium">
              (read-only)
            </span>
          ) : null} */}
        </Label>
      ) : null}
      <Group
        className={clsx("c-input flex py-0 pr-0  bg-primary-100", {
          "group-data-[invalid]:border-negative-300": invalid,
        })}
        ref={groupRef}
      >
        <DateInput className="flex flex-1 py-[14px] focus-within:outline-none">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="px-0.5 leading-none tabular-nums outline-none rounded-sm focus:bg-accent-500 focus:text-primary-50 caret-transparent placeholder-shown:italic"
            />
          )}
        </DateInput>
        <Button
          variant="primary"
          className="bg-transparent rounded-l-none data-[focus]:border-none rounded-r border-l-4 border-l-primary-200 border-solid border border-r-0 border-t-0 border-b-0 text-primary-500 group-data-[invalid]:border-l-negative-3
          00"
        >
          <ChevronUpDownIcon className="w-5 h-5 group-invalid:text-negative-500" />
        </Button>
      </Group>
      <SwitchTransition state={invalid} timeout={200} mode="out-in">
        {(invalid, stage) => (
          <div
            className={clsx(
              "transition-opacity duration-200 text-sm",
              {
                from: "opacity-0 ease-in",
                enter: "",
                leave: "opacity-0 ease-out",
              }[stage]
            )}
          >
            {invalid ? (
              <Text slot="errorMessage" className="text-negative-500">
                {showError + (showError?.at(-1) === "." ? "" : ".")}
              </Text>
            ) : null}
          </div>
        )}
      </SwitchTransition>
      <Popover className="">
        <Dialog className="px-4 py-[0.16rem]">
          <Calendar>
            <header className="flex items-center gap-1 pb-4 px-1 font-serif w-full">
              <Heading className="flex-1 font-semibold text-2xl ml-2" />
              <Button slot="previous" variant="primary">
                <ChevronLeftIcon className="w-5 h-5" />
              </Button>
              <Button slot="next" variant="primary">
                <ChevronRightIcon className="w-5 h-5" />
              </Button>
            </header>
            <CalendarGrid className="border-spacing-1 border-separate">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-xs font-semibold">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="w-9 h-9 outline-none cursor-default rounded-full flex items-center justify-center transition ease-in-out duration-75 outside-month:text-primary-300 hover:bg-primary-100 pressed:bg-accent-500 pressed:text-primary-50 selected:bg-accent-500 selected:text-primary-50"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
});

export default DatePicker;
