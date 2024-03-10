import {
  ArrowLeftOnRectangleIcon,
  BellAlertIcon,
  BuildingStorefrontIcon,
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
  ExclamationCircleIcon,
  HomeIcon,
  MoonIcon,
  QrCodeIcon,
  QuestionMarkCircleIcon,
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

export const dataFriendSideBar: Readonly<DataProps[]> = [
  {
    name: "Home",
    iconName: HomeIcon,
    link: "/friends",
  },
  {
    name: "Friend requests",
    iconName: UsersIcon,
    link: "/friends/requests",
  },
  {
    name: "Suggestions",
    iconName: UsersIcon,
    link: "/friends/suggestions",
  },
];

export const dataMenuProfile: Readonly<DataProps[]> = [
  {
    name: "Setting & privacy",
    iconName: Cog6ToothIcon,
    link: "/",
  },
  {
    name: "Help & support",
    iconName: QuestionMarkCircleIcon,
    link: "/",
  },
  {
    name: "Display & accessibility",
    iconName: UsersIcon,
    link: "/",
  },
  {
    name: "Get feedback",
    iconName: ExclamationCircleIcon,
    link: "/",
  },
  {
    name: "Log out",
    iconName: ArrowLeftOnRectangleIcon,
    link: "/",
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
