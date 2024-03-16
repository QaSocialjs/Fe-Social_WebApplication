import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { ar1X1 } from "@cloudinary/url-gen/qualifiers/aspectRatio";
import AvatarClient from "@components/AvatarClient";
import Button from "@components/Button";
import Menu from "@components/Menu/Menu";
import MenuItem from "@components/Menu/MenuItem";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { UseUserContext } from "@lib/context/usercontext";
import { Gender } from "@lib/models/User";
import { dataMenuProfile } from "@lib/utils/datasiderbar";
import { toImage } from "@lib/utils/service.assetInfo";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

function AccountMenuDropBar() {
  const { user } = UseUserContext();
  const [avatar, setAvatar] = useState<any>(null);
  useEffect(() => {
    if (!user) return;
    setAvatar(
      user?.avatar
        ? toImage(user?.avatar)
            .resize(fill().aspectRatio(ar1X1()))
            .resize(scale(256, 256))
            .delivery(dpr("auto"))
            .format("auto")
            .quality("auto")
            .toURL()
        : undefined
    );
  }, [user]);

  return (
    <Menu
      labelMenu={
        <div
          className="h-10 aspect-square bg-primary-950 rounded-full relative cursor-pointer"
          data-tooltip-id="account"
          data-tooltip-content="account"
        >
          <ChevronDownIcon className="bg-primary-200 rounded-full h-3 aspect-square absolute right-0 bottom-0 border-2 border-solid border-primary-50 [&>path]:stroke-[10]"></ChevronDownIcon>
          <Tooltip id="account" className="transition z-10" />
        </div>
      }
      variantBtn="primary"
      classBtn=" bg-primary-100 p-0 bg-opacity-10 rounded-full w-fit outline-none"
      classPpv="px-4 py-3"
      classNameMenu="gap-2 flex flex-col"
      // isOpen={isOpen}
    >
      <MenuItem id="default">
        <div className="flex flex-col items-center justify-start text-center shadow-md rounded px-4 py-2">
          <Button
            className="flex items-center bg-transparent hover:bg-primary-950 hover:bg-opacity-5 py-0 text-primary-950 w-full no-underline text-center gap-4"
            variant="primary"
            as="link"
            href={user?.id}
          >
            <AvatarClient
              src={avatar}
              fallbackConfig={{
                sex: user?.gender! === Gender.Male ? "man" : "woman",
              }}
              className="w-11 rounded-full"
            />
            <h3 className="font-medium">
              {user?.lastName! + " " + user?.firstName!}
            </h3>
          </Button>
          <hr className="h-[2px] bg-primary-950 bg-opacity-40 border-none w-full" />
          <Button
            className="flex items-center bg-primary-900 bg-opacity-10 rounded p-2 justify-center text-primary-950 w-full no-underline text-center gap-4 text-base"
            variant="primary"
          >
            Create other profile
          </Button>
        </div>
      </MenuItem>
      {dataMenuProfile.map((item, idx) => (
        <MenuItem id={item.name}>
          <Button
            className={clsx(
              "flex w-full items-center outline-none no-underline hover:bg-primary-950 hover:bg-opacity-5 bg-transparent text-primary-950 rounded-lg px-2 py-0 text-sm"
            )}
            as="link"
            key={idx}
            href={`${item.link}`}
            data-tooltip-id={item.name}
            data-tooltip-content={item.name}
            variant="primary"
          >
            <item.iconName className="h-7 aspect-square w-fit"></item.iconName>

            <p className="text-base">{item.name}</p>
          </Button>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default AccountMenuDropBar;
