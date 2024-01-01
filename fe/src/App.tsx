import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./routes/login";
import LangProvider from "./lib/context/languagecontex";
import { ThemeProvider } from "./lib/context/theme.context";
import { ApiClient } from "@lib/services/ApiClient";
import configOptions from "@lib/services/configOption";
import SignUp from "./routes/signup";
import ProtectedAuthentication from "./routes/utils/ProtectedAuthentication";
import Home from "./routes/home";
import AuthenticatedError from "./routes/ErrorPages/AuthenticatedError";
import ErrorPages from "./routes/ErrorPages/ErrorPages";
import { RouterProvider } from "react-aria-components";
import UserContextProvider from "@lib/context/usercontext";
import Profile from "./routes/profile/profile";
import ConfirmAccount from "./routes/ConfirmAccount/ConfirmAccount";

function App() {
  ApiClient.use(configOptions);
  let navigate = useNavigate();

  return (
    <RouterProvider navigate={navigate}>
      <LangProvider>
        <ThemeProvider>
          <Routes>
            <Route
              path="/"
              element={
                <UserContextProvider>
                  <Home />
                </UserContextProvider>
              }
            >
              <Route path="/videos" element={<SignUp></SignUp>}></Route>
            </Route>
            <Route
              path="/:id"
              element={
                <UserContextProvider>
                  <Profile />
                </UserContextProvider>
              }
            ></Route>
            <Route
              path={`/login`}
              element={
                <ProtectedAuthentication>
                  <Login />
                </ProtectedAuthentication>
              }
            ></Route>
            <Route
              path={`/signup`}
              element={
                <ProtectedAuthentication>
                  <SignUp />
                </ProtectedAuthentication>
              }
            ></Route>
            <Route
              path={"/confirmCode/:email"}
              element={
                // <ProtectedAuthentication>
                <ConfirmAccount />
                // </ProtectedAuthentication>
              }
            ></Route>
            <Route path="/error" element={<ErrorPages />}>
              <Route
                path="authenticatedError"
                element={<AuthenticatedError />}
              ></Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </LangProvider>
    </RouterProvider>
  );
}

export default App;
