import * as SolidIcons from "@heroicons/react/24/solid";
import * as OutlineIcons from "@heroicons/react/24/outline";
import classes from "./hero-icon.module.css";
export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

type HeroIconProps = {
  solid?: boolean;
  iconName: IconName;
  className?: string;
};

export const HeroIcon = ({
  solid,
  iconName,
  className,
}: HeroIconProps): JSX.Element => {
  const Icon = solid ? SolidIcons[iconName] : OutlineIcons[iconName];
  return (
    <Icon
      className={`${
        className === "true" ? classes.fontBoldIcon : classes.heroIcon
      }`}
    />
  );
};
