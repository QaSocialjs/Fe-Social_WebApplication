import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { ar1X1 } from "@cloudinary/url-gen/qualifiers/aspectRatio";
import AvatarClient from "@components/AvatarClient";
import Button from "@components/Button";
import { NotificationType } from "@lib/models/Friend";
import { Gender, User } from "@lib/models/User";
import { toImage } from "@lib/utils/service.assetInfo";
import { cn } from "@lib/utils/utils";
import React, { HTMLAttributes, useEffect, useState } from "react";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  user: User | null;
  type: NotificationType | null;
  className?: string;
  body: string;
}

const baseClass =
  "px-4 py-2 border-2 bg-primary-0 rounded duration-500 border-primary border border-solid w-full h-full";

function CardNotification({ user, type, className, body, ...props }: Props) {
  useEffect(() => {
    if (!user) return;
  }, [user]);
  const [avatar] = useState(
    user!.avatar
      ? toImage(user!.avatar)
          .resize(fill().aspectRatio(ar1X1()))
          .resize(scale(256, 256))
          .delivery(dpr("auto"))
          .format("auto")
          .quality("auto")
          .toURL()
      : undefined
  );
  return (
    <div {...props} className={cn(baseClass, className)}>
      <div className="grid grid-cols-[1fr_2fr] gap-2 justify-between items-center">
        <AvatarClient
          src={avatar}
          fallbackConfig={{
            sex: user?.gender === Gender.Female ? "woman" : "man",
          }}
          className="w-20 aspect-square bg-white"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-bold leading-body p-0 m-0">
            {user?.lastName! + user?.firstName}
          </h2>
          <span className="text-sm">{body}</span>
          <div className="flex gap-2">
            <Button className="p-2 relative">Accept</Button>
            <Button className="bg-opacity-80 p-2" variant="primary">
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardNotification;
