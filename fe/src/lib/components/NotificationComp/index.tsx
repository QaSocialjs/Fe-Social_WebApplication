import Button from "@components/Button";
import Menu from "@components/Menu/Menu";
import MenuItem from "@components/Menu/MenuItem";
import {
  BellAlertIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { TypeNotification, formatNotificationType } from "./type";
import NotificationType from "./NotificationType";

function Notification() {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data] = useState([
    {
      name: "oioho8ho8ho12e",
      type: 1,
    },
    {
      name: "asdbaksjdaa",
      type: 2,
    },
    {
      name: "Asdakdkusahdd",
      type: 1,
    },
    {
      name: "akjsbdkad",
      type: 2,
    },
  ]);
  return (
    <Menu
      labelMenu={<BellAlertIcon className="h-6 mt-1 text-primary-950" />}
      variantBtn="primary"
      classBtn="bg-primary-900 bg-opacity-10 rounded-full px-[0.6rem] py-1"
      classPpv="px-4 py-3"
      // isOpen={isOpen}
    >
      <MenuItem id="default">
        <div className="justify-between flex items-center">
          <h2 className="p-0 mt-0 font-medium">Notification</h2>
          <Button
            variant="primary"
            className="bg-transparent hover:bg-primary-200 hover:bg-opacity-30 rounded-full  px-[0.4rem] py-1 mb-2 pb-1"
          >
            <EllipsisHorizontalIcon className="h-6 aspect-square text-primary-900 pt-1 text-opacity-75" />
          </Button>
        </div>
      </MenuItem>
      {data.map(({ name, type }) => (
        <MenuItem id={name}>
          <NotificationType name={name} type={type} />
        </MenuItem>
      ))}
    </Menu>
  );
}

export default Notification;
