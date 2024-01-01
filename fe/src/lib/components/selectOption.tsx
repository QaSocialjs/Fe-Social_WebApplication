import React, { useContext, useRef, useState } from "react";
import HeroIcon from "./Heroicon";
import Button from "./Button";
import { LangContext } from "../context/languagecontex";

interface selectProps<T> {
  item: Array<T>;
}

type ValueOfSelection = {
  value?: string;
  isBelow?: boolean;
};
const SelectOption = <T extends ValueOfSelection>({
  item,
}: selectProps<T>): React.ReactElement => {
  const [open, setOpen] = useState<boolean>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (!open) {
      inputRef.current?.focus();
    } else {
      setOpen(false);
    }
  };

  const { handleLang } = useContext(LangContext);
  return (
    <div className="font-medium relative bg-white-50 rounded-md">
      {open ? (
        <div className="absolute bottom-0 mb-8 border-[1px] w-[140px] border-solid bg-white-50 border-gray-500 rounded-md">
          {item.map((i, idx) => (
            <div
              key={idx}
              className="text-gray-700 cursor-pointer hover:bg-white-200 px-1 py-1 hover:bg-opacity-40"
              onClick={() => {
                handleLang(i.value);
                setOpen(false);
              }}
            >
              <p>{i.value}</p>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <div className="text-gray-950 flex gap-1 items-center border-[1px] border-solid border-gray-500 rounded-md px-[4px]">
        <input
          className="text-opacity-75 px-1 py-1 w-[140px] border-r-[1px]"
          placeholder="Change languague"
          ref={inputRef}
          onFocus={() => {
            if (open !== true) {
              setOpen(true);
            }
          }}
        />
        <Button onPress={handleFocus}>
          <HeroIcon iconName="Square2StackIcon" className="cursor-pointer" />
        </Button>
      </div>
    </div>
  );
};

export default SelectOption;
