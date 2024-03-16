import CardNotification from "@components/NotificationComp/CardNotification";
import { NotificationType } from "@lib/models/Friend";
import { User } from "@lib/models/User";
import { Transition } from "@headlessui/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UseSocketContext } from "./SocketIocontext";

type PropsNotification = {
  isShowing: boolean;
  user: User | null;
  type: NotificationType | null;
  body?: string;
  setIsShowing: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<any>>;
  setBody: Dispatch<SetStateAction<any>>;
  setType: Dispatch<SetStateAction<any>>;
};

const NotificationAlertContext = createContext<PropsNotification>({
  isShowing: false,
  user: null,
  type: null,
  body: "",
  setIsShowing: () => {},
  setUser: () => {},
  setBody: () => {},
  setType: () => {},
});

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [body, setBody] = useState<string>("");
  const [type, setType] = useState<NotificationType | null>(null);

  const { socketIo } = UseSocketContext();
  useEffect(() => {
    if (!socketIo) return;
    socketIo.on("NotificationAlert", ({ u, type }) => {
      console.log(u);
      setUser(u);
      setType(type);
      setBody("Send friend request to you");
      setIsShowing(true);
    });
    socketIo.on("Some thing is wrong", () => {
      // log out
    });
  }, [socketIo]);
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      setUser(null);
      setType(null);
      setBody("");
      setIsShowing(false);
    }, 1000);
    return () => clearInterval(timer);
  }, [user, body, isShowing, type]);
  const value = useMemo(
    () => ({
      isShowing,
      user,
      body,
      type,
      setBody,
      setIsShowing,
      setType,
      setUser,
    }),
    [isShowing, user, body, type]
  );
  return (
    <NotificationAlertContext.Provider value={value}>
      {children}
      <Transition
        show={isShowing}
        className="flex flex-col gap-6 w-[22rem] h-[8rem] fixed bottom-5 left-12 bg-primary-50 rounded"
        enter="transition ease-in-out"
        enterFrom="opacity-0 scale-0"
        leave="transition ease-in-out duration-300"
        leaveTo="opacity-0 scale-0"
      >
        {user ? (
          <CardNotification
            user={user}
            type={type}
            body={body}
          ></CardNotification>
        ) : null}
      </Transition>
    </NotificationAlertContext.Provider>
  );
}
