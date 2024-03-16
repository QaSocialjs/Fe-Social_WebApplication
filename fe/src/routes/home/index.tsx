import { Outlet } from "react-router";
import Mainlayout from "../../lib/layouts/layout-main-screen";
import { UseUserContext } from "@lib/context/usercontext";
const Home = () => {
  const { user } = UseUserContext();
  return <div>asd</div>;
};

export default Home;
