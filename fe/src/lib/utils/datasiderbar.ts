import { iconName } from "../components/Heroicon";

export type dataProps = {
  name: string;
  iconName: iconName;
  link: string;
};

export const data: Readonly<dataProps[]> = [
  {
    name: "Home",
    iconName: "RectangleGroupIcon",
    link: "/",
  },
  {
    name: "Subject",
    iconName: "Bars3Icon",
    link: "/subject",
  },
];
