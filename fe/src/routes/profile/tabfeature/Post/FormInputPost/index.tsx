import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { ar1X1 } from "@cloudinary/url-gen/qualifiers/aspectRatio";
import AvatarClient from "@components/AvatarClient";
import Button from "@components/Button";
import {
  FlagIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import { UseUserContext } from "@lib/context/usercontext";
import { Gender } from "@lib/models/User";
import { toImage } from "@lib/utils/service.assetInfo";
import React, { useEffect, useState } from "react";

function FormInputPost() {
  const { user } = UseUserContext();
  const [avatar, setAvatar] = useState<any>();
  const [dataTypePost] = useState([
    {
      text: "Live video",
      icon: (
        <VideoCameraIcon className="h-5 aspect-square text-negative-500"></VideoCameraIcon>
      ),
    },
    {
      text: "Photo/video",
      icon: <PhotoIcon className="h-5 aspect-square text-positive-500" />,
    },
    {
      text: "Life event",
      icon: <FlagIcon className="h-5 aspect-square text-accent-400"></FlagIcon>,
    },
  ]);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user) {
      const a = user.avatar
        ? toImage(user.avatar)
            .resize(fill().aspectRatio(ar1X1()))
            .resize(scale(256, 256))
            .delivery(dpr("auto"))
            .format("auto")
            .quality("auto")
            .toURL()
        : undefined;
      setAvatar(a);
    }
  }, [user]);
  return (
    <div className="border border-solid border-primary-200 h-fit w-full p-3 rounded grid gap-2">
      <div className="flex gap-2">
        <AvatarClient
          src={avatar}
          fallbackConfig={{
            sex: user?.gender === Gender.Female ? "woman" : "man",
          }}
          className="w-12 aspect-square bg-white"
        />
        <Button
          className="w-full text-left rounded-3xl bg-primary-200 text-primary-950 bg-opacity-25 text-base hover:bg-opacity-50"
          variant="primary"
        >
          What's on your mind
        </Button>
      </div>
      <hr className="h-[1px] rounded w-full bg-primary-200 border-none" />
      <div className="flex gap-2">
        {React.Children.toArray(
          dataTypePost.map(({ text, icon }, idx) => (
            <Button
              key={idx}
              className="w-full flex items-center justify-center gap-1 p-2 rounded bg-primary-200 text-primary-950 hover:bg-primary-200 hover:bg-opacity-30 text-base bg-transparent"
              variant="primary"
            >
              {icon}
              <span>{text}</span>
            </Button>
          ))
        )}
      </div>
    </div>
  );
}

export default FormInputPost;
