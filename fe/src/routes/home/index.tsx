import { Outlet } from "react-router";
import Mainlayout from "../../lib/layouts/layout-main-screen";
const Home = () => {
  return (
    <Mainlayout>
      <div>
        <Outlet></Outlet>
      </div>
    </Mainlayout>
  );
};

export default Home;
