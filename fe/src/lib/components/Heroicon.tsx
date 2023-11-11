import * as Solid from "@heroicons/react/24/solid";
import * as Outline from "@heroicons/react/24/outline";
import { typeProps } from "../utils/typeProps";
import { cn } from "../utils/utils";

export type iconName = keyof typeof Solid | keyof typeof Outline;

type HeroiconProps = typeProps & {
  solid?: boolean;
  className?: string;
  iconName: iconName;
};

const HeroIcon = ({
  solid,
  className,
  iconName,
}: HeroiconProps): React.ReactElement => {
  const Icon = solid ? Solid[iconName] : Outline[iconName];
  return <Icon className={cn("h-5 w-5 text-gray-950", className)} />;
};

export default HeroIcon;
