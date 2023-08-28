import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashbord from "./routes/UI/dashboard/Dashbord";
import Repository from "./routes/UI/dashboard/repository/Repository";
import NewRepository from "./routes/UI/dashboard/New/NewRepository";
import Login from "./routes/login/login";
import Signup from "./routes/signup/Signup";
import Erorr from "./routes/UI/erorr/Erorr";
import VerifyToken from "./Context/VerifyToken";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Error/:id" element={<Erorr />}></Route>
        <Route
          path="/Dashboard"
          element={
            <VerifyToken>
              <Dashbord />
            </VerifyToken>
          }
        >
          <Route index element={<Repository />}></Route>
          <Route path="New" element={<NewRepository />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
