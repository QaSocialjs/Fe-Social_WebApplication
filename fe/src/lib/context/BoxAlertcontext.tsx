import BoxAlert from "@components/BoxAlert";
import { Transition } from "@headlessui/react";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type PropsBoxAlert = {
  isShowing: boolean;
  title: string;
  body?: string;
  variant?: "positive" | "negative";
  setIsShowing: Dispatch<SetStateAction<any>>;
  setTitle: Dispatch<SetStateAction<any>>;
  setBody: Dispatch<SetStateAction<any>>;
  setVariant: Dispatch<SetStateAction<any>>;
};

const BoxAlertContext = createContext<PropsBoxAlert>({
  isShowing: false,
  title: "",
  body: "",
  variant: "negative",
  setBody: () => {},
  setIsShowing: () => {},
  setTitle: () => {},
  setVariant: () => {},
});

export const useBoxAlertContext = (): PropsBoxAlert => {
  return useContext<PropsBoxAlert>(BoxAlertContext);
};

export default function BoxAlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [variant, setVariant] = useState<"positive" | "negative">("negative");
  useEffect(() => {
    if (isShowing) {
      const timer = setTimeout(() => {
        setIsShowing(false);
        setBody("");
        setTitle("");
        setIsShowing(false);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isShowing]);
  const contextValue = useMemo(
    () => ({
      isShowing,
      setIsShowing,
      body,
      setBody,
      title,
      setTitle,
      variant,
      setVariant,
    }),

    [isShowing, title, body]
  );
  return (
    <BoxAlertContext.Provider value={contextValue}>
      {children}
      <Transition
        show={isShowing}
        className="flex flex-col gap-6 w-[20rem] fixed bottom-5 left-12 bg-primary-50 rounded"
        enter="transition ease-in-out"
        enterFrom="opacity-0 scale-0"
        leave="transition ease-in-out duration-300"
        leaveTo="opacity-0 scale-0"
      >
        <BoxAlert variant={variant} title={title} body={body}></BoxAlert>
      </Transition>
    </BoxAlertContext.Provider>
  );
}
