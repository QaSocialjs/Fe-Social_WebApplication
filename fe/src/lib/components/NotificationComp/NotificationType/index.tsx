import React from "react";
import { formatNotificationType } from "../type";
import { BeakerIcon, TvIcon } from "@heroicons/react/24/solid";

type Props = {
  name: string;
  type: number;
};

export default function NotificationType({ name, type }: Props) {
  let Node: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;

  if (formatNotificationType(type) === 1) {
    Node = BeakerIcon;
  } else {
    Node = TvIcon;
  }

  return (
    <div className="flex justify-between">
      <div>img</div>
      <div>
        {name}
        <Node className="h-5"></Node>
      </div>
    </div>
  );
}
