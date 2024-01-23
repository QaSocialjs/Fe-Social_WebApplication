import { hookDispatchThunk } from "@lib/hook/ReduxHook";
import { User } from "@lib/models/User";
import { getUser } from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { typeProps } from "@lib/utils/typeProps";
import { Ok, ResultAsync } from "neverthrow";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";

type ContextUserProps = {
  user: User | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<ContextUserProps>({
  user: null,
  isLoading: false,
  setUser: () => {},
  setIsLoading: () => {},
});

export const UseUserContext = (): ContextUserProps => {
  return useContext<ContextUserProps>(UserContext);
};

export default function UserContextProvider({ children }: typeProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = hookDispatchThunk();
  useEffect(() => {
    dispatch(getUser("")).then(async (e) => {
      const response = e.payload as Ok<
        Response,
        void | Error | ApiError | ResultAsync<never, ApiError>
      >;
      if (response.isOk()) {
        const userData = (await response.value.json()) as User;
        setUser(userData);
      }
      if (response.isErr()) {
        navigate("/login");
      }
    });
  }, []);
  useEffect(() => {
    if (!isLoading) return;
    dispatch(getUser("")).then(async (e) => {
      const response = e.payload as Ok<
        Response,
        void | Error | ApiError | ResultAsync<never, ApiError>
      >;
      if (response.isOk()) {
        const userData = (await response.value.json()) as User;
        setUser(userData);
        setIsLoading(false);
      }
      if (response.isErr()) {
        navigate("/login");
      }
    });
  }, [isLoading, setIsLoading]);
  const contextValue = useMemo(
    () => ({ user, setUser, isLoading, setIsLoading }),
    [user, setUser, isLoading, setIsLoading]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
