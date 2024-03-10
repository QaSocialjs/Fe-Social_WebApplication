import Link from "@components/Link";
import { dataFriendSideBar } from "@lib/utils/datasiderbar";
import clsx from "clsx";
import { useLocation } from "react-router";

function SideBarFriend() {
  const { pathname } = useLocation();
  return (
    <div className="sticky p-2 border-t-0 border-r-1 border-l-0 border-b-0 border-solid border-r-primary-950 border-opacity-10 shadow-lg">
      <h1 className="px-2 font-bold">Friends</h1>
      <div className="flex flex-col gap-2 text-center w-full rounded-lg">
        {dataFriendSideBar.map(({ ...item }, idx) => (
          <Link
            className={clsx(
              "flex w-full items-center outline-none no-underline",
              {
                "text-primary-950": pathname !== item.link,
              },
              {
                "bg-primary-900 bg-opacity-10 rounded": pathname === item.link,
              }
            )}
            key={idx}
            href={`${item.link}`}
            data-tooltip-id={item.name}
            data-tooltip-content={item.name}
          >
            <item.iconName className="h-10 py-2 px-2 w-fit"></item.iconName>

            <p className="text-base">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBarFriend;
