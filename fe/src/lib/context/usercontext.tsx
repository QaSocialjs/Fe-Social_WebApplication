import { hookDispatchThunk } from "@lib/hook/ReduxHook";
import { User } from "@lib/models/User";
import { getUser } from "@lib/redux/user/UserThunk";
import { typeProps } from "@lib/utils/typeProps";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";

type ContextUserProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const UserContext = createContext<ContextUserProps>({
  user: null,
  setUser: () => {},
});

export const UseUserContext = (): ContextUserProps => {
  return useContext<ContextUserProps>(UserContext);
};

export default function UserContextProvider({ children }: typeProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const dispatch = hookDispatchThunk();
  useEffect(() => {
    dispatch(getUser("")).then(async (r: any) => {
      console.log(r.payload);
      if (r.payload.isOk) {
        setUser((await r.payload.value.json()) as User);
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
