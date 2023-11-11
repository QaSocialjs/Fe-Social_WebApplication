import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Subject from "./routes/subject";
import Login from "./routes/login";
import LangProvider from "./lib/context/languagecontex";
import { ThemeProvider } from "./lib/context/theme.context";

function App() {
  return (
    <LangProvider>
      <ThemeProvider>
        <Routes>
          {/* <Route path="/">
          <Route index element={<Home />}></Route>
          <Route path="subject" element={<Subject />} />
        </Route> */}
          <Route path={`/login`} element={<Login></Login>}></Route>
        </Routes>
      </ThemeProvider>
    </LangProvider>
  );
}

export default App;
