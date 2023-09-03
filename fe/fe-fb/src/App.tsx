import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/login/login";
import Signup from "./routes/signup/Signup";
import Erorr from "./routes/UI/erorr/Erorr";
import Home from "./routes/UI/Home/Home";
import { MainLayout } from "./components/layout/main-layout";
import Foryou from "./routes/UI/Home/foryou /Foryou";
import Following from "./routes/UI/Home/Following/Following";
import { HomeLayout } from "./components/layout/common-layout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Error/:id" element={<Erorr />}></Route>
        {/* <Route
          path="/Dashboard"
          element={
            <VerifyToken>
              <Dashbord />
            </VerifyToken>
          }
        >
          <Route index element={<Repository />}></Route>
          <Route path="New" element={<NewRepository />}></Route>
        </Route> */}

        <Route
          path="/Home"
          element={
            <MainLayout>
              <HomeLayout>
                <Home></Home>
              </HomeLayout>
            </MainLayout>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
