import { Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import LangProvider from "./lib/context/languagecontex";
import { ThemeProvider } from "./lib/context/theme.context";
import { ApiClient } from "@lib/services/ApiClient";
import configOptions from "@lib/services/configOption";
import SignUp from "./routes/signup";

function App() {
  ApiClient.use(configOptions);
  return (
    <LangProvider>
      <ThemeProvider>
        <Routes>
          {/* <Route path="/">
          <Route index element={<Home />}></Route>
          <Route path="subject" element={<Subject />} />
        </Route> */}
          <Route path={`/login`} element={<Login></Login>}></Route>
          <Route path={`/signup`} element={<SignUp></SignUp>}></Route>
        </Routes>
      </ThemeProvider>
    </LangProvider>
  );
}

export default App;
