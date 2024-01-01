import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";
import {
  ListBox,
  Select,
  SelectProps,
  SelectValue,
  Text,
} from "react-aria-components";
import Label from "./Label";
import Button from "./Button";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Popover from "./Popover";
import { SwitchTransition } from "transition-hook";

export interface UncontrollerSelectFiledProps<T extends object>
  extends Omit<SelectProps<T>, "children" | "name"> {
  name: string;
  children?: ReactNode | ((values: T) => ReactNode);
  label?: string;
  description?: string;
  errorMessage?: string;
  items?: Iterable<T>;
}
function UncontrollerSelectFiled<T extends object>({
  name,
  label,
  children,
  errorMessage,
  description,
  className,
  items,
  isRequired,
  onBlur,
  ...props
}: UncontrollerSelectFiledProps<T>) {
  const invalid = props.isInvalid || !!errorMessage;
  const ref = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement | null>();
  useEffect(() => {
    selectRef.current = ref.current?.parentElement?.querySelector(
      `select[name="${name}"]`
    );
  }, []);
  return (
    <Select
      {...props}
      className={clsx("group outline-none", className)}
      isInvalid={invalid}
      isRequired={isRequired}
      name={name}
      ref={ref}
      onBlur={(e) => {
        selectRef.current?.dispatchEvent(
          new Event("blur", { bubbles: true, cancelable: true })
        );
        onBlur?.(e);
      }}
    >
      {label ? (
        <Label className="cursor-default mb-0.5 text-base flex items-center gap-1 flex-wrap">
          {label}
          {isRequired ? (
            <span className="text-primary-950 text-xs font-medium">*</span>
          ) : null}
        </Label>
      ) : null}
      <Button
        className={clsx(
          "p-3 rac-hover:bg-primary-50 bg-primary-100 border border-primary-200 border-solid group-invalid:border-negative-500 flex items-center transition-[outline] ease-in-out w-full",
          {
            "border-negative-500": invalid,
          }
        )}
      >
        <SelectValue className="truncate placeholder-shown:italic flex-1 text-left text-primary-950 text-opacity-50" />
        <ChevronUpDownIcon className="w-5 h-5 text-primary-500 group-invalid:text-negative-500" />
      </Button>
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
                {errorMessage ? errorMessage : ""}
              </Text>
            ) : null}
          </div>
        )}
      </SwitchTransition>
      <Popover>
        <ListBox items={items}>{children}</ListBox>
      </Popover>
    </Select>
  );
}

export default UncontrollerSelectFiled;
