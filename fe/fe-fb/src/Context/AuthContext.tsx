import { createContext, useContext } from "react";

interface AuthContext {
  accesstoken: String;
}

export const AuthContext = createContext<AuthContext>({
  accesstoken: "",
});

export default AuthContext;
