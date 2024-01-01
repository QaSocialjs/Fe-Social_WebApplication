import LayoutError from "@lib/layouts/layout-error";
import { Outlet } from "react-router";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
function ErrorPages() {
  return (
    <LayoutError className="flex flex-col bg-primary-100 gap-5 justify-center text-center items-center h-screen">
      <div className="items-center flex">
        <h1 className="text-[5.5rem] m-0 text-negative-500 font-extrabold tracking-wider">
          Error pages.
        </h1>
        <ExclamationCircleIcon className="text-negative-500 h-24 aspect-square mt-7" />
      </div>
      <div className="text-5xl text-accent-600 font-bold tracking-widest">
        OOOPS!!!
      </div>
      <Outlet />
    </LayoutError>
  );
}

export default ErrorPages;
