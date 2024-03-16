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
import Post from "./routes/profile/tabfeature/Post";
import About from "./routes/profile/tabfeature/About/About";
import OverView from "./routes/profile/tabfeature/About/OverView";
import Mainlayout from "@lib/layouts/layout-main-screen";
import PlaceLive from "./routes/profile/tabfeature/About/PlaceLive";
import ContactAndInfo from "./routes/profile/tabfeature/About/ContactInfo";
import WorkPlace from "./routes/profile/tabfeature/About/WorkPlace";
import Friends from "./routes/friends";
import SocketProvider from "@lib/context/SocketIocontext";
import LayoutFriend from "@lib/layouts/layout-friend";
import FriendRequestion from "./routes/friends/FriendRequestion";
import FriendSuggestion from "./routes/friends/FriendSuggestion";
import CardNotification from "@components/NotificationComp/CardNotification";
import { NotificationType } from "@lib/models/Friend";
import NotificationProvider from "@lib/context/NotificationContext";
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
                  <SocketProvider>
                    <NotificationProvider>
                      <Mainlayout></Mainlayout>
                    </NotificationProvider>
                  </SocketProvider>
                </UserContextProvider>
              }
            >
              <Route index element={<Home />}></Route>
              <Route path="friends" element={<LayoutFriend />}>
                <Route index element={<Friends />}></Route>
                <Route
                  path="/friends/requests"
                  element={
                    <div className="overflow-y-auto">
                      <FriendRequestion />
                    </div>
                  }
                ></Route>
                <Route
                  path="/friends/suggestions"
                  element={
                    <div className="overflow-y-auto">
                      <FriendSuggestion />
                    </div>
                  }
                ></Route>
              </Route>
              <Route path=":id/*" element={<Profile />}>
                <Route index element={<Post />}></Route>
                <Route path="about" element={<About />}>
                  <Route index element={<OverView />}></Route>
                  <Route path="places_lived" element={<PlaceLive />}></Route>
                  <Route
                    path="contact_and_basic_info"
                    element={<ContactAndInfo />}
                  ></Route>
                  <Route
                    path="work_and_education"
                    element={<WorkPlace />}
                  ></Route>
                </Route>
              </Route>
            </Route>

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
