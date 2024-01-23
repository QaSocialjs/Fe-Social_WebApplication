import {
  BellAlertIcon,
  BuildingStorefrontIcon,
  ChatBubbleBottomCenterIcon,
  HomeIcon,
  QrCodeIcon,
  ServerStackIcon,
  TvIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import React from "react";

export type DataProps = {
  name: string;
  iconName: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  link?: string;
};

export const data: Readonly<DataProps[]> = [
  {
    name: "Home",
    iconName: HomeIcon,
    link: "/",
  },
  {
    name: "Friends",
    iconName: UsersIcon,
    link: "/friends",
  },
  {
    name: "Videos",
    iconName: TvIcon,
    link: "/videos",
  },
  {
    name: "Marketplace",
    iconName: BuildingStorefrontIcon,
    link: "/marketplace",
  },
  {
    name: "Gaming",
    iconName: ServerStackIcon,
    link: "/gaming",
  },
];

export const dataInfor: Readonly<DataProps[]> = [
  {
    name: "Menu",
    iconName: QrCodeIcon,
  },
  {
    name: "Message",
    iconName: ChatBubbleBottomCenterIcon,
    link: "/marketplace",
  },
  {
    name: "Notifications",
    iconName: BellAlertIcon,
  },
];
export const aa: DataProps[] = [
  {
    name: "Menu",
    iconName: QrCodeIcon,
  },
  {
    name: "Message",
    iconName: ChatBubbleBottomCenterIcon,
    link: "/marketplace",
  },
  {
    name: "Notifications",
    iconName: BellAlertIcon,
  },
];
