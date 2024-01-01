import {
  Listbox as HeadlessUiListbox,
  Transition,
  type ListboxProps as HeadlessUiListboxProps,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment, type Key, type ReactNode } from "react";
export type ListboxProps<TType, TActualType> = Omit<
  HeadlessUiListboxProps<"div", TType, TActualType>,
  "value" | "onChange"
> & {
  items: TType[];
  render(value: TType): ReactNode;
  placement?: "top" | "bottom";
  value?: TType;
  onChange?(value: TType): void;
};
export function Listbox<TType extends { key: Key }, TActualType>({
  items,
  render,
  className,
  placement = "top",
  ...props
}: ListboxProps<TType, TActualType>) {
  return (
    <HeadlessUiListbox<"div", TType, TActualType> {...props}>
      {({ open, value }) => (
        <>
          <div>{render(value)}</div>
        </>
      )}
    </HeadlessUiListbox>
  );
}
