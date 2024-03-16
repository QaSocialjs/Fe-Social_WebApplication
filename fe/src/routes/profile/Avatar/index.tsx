import Popover from "@components/Popover";
import { DialogTrigger, ListBox } from "react-aria-components";
import { useEffect, useState } from "react";
import ListBoxItem from "@components/ListBoxItem";
import {
  CameraIcon as CameraIconSolid,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { CameraIcon as CameraIconOutline } from "@heroicons/react/24/outline";
import AvatarClient from "@components/AvatarClient";
import { Gender, User } from "@lib/models/User";
import Button from "@components/Button";
import ModalUploadImg from "./ModalUploadImg";
import { toImage } from "@lib/utils/service.assetInfo";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { ar1X1 } from "@cloudinary/url-gen/qualifiers/aspectRatio";
import { StatusDto, StatusFriend, valueStatusFriend } from "@lib/models/Friend";

type Props = {
  user: User;
  statusFriend?: StatusDto;
  isCurrentUser: boolean | null;
};
function AvatarIndex({ user, statusFriend, isCurrentUser }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<any>();

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
  const [avatarOption] = useState([
    {
      icon: (
        <CameraIconOutline className="h-5 aspect-square"></CameraIconOutline>
      ),
      text: "Chooes profile picture",
    },
    {
      icon: (
        <CameraIconOutline className="h-5 aspect-square"></CameraIconOutline>
      ),
      text: "Create avatar profile picture",
    },
  ]);
  console.log(statusFriend?.status);
  return (
    <div className="h-[15vh] w-[70vw]">
      <div className="relative h-full">
        <div>
          <DialogTrigger>
            <Button className="absolute bg-primary-50 -top-20 left-10 border-4 border-solid outline-none focus:outline-none rac-hover:outline-none group-hover:outline-none focus:bg-primary-50 border-primary-50  rac-hover:bg-primary-50 p-0 cursor-pointer rounded-full">
              <AvatarClient
                src={avatar}
                fallbackConfig={{
                  sex: user?.gender === Gender.Female ? "woman" : "man",
                }}
                className="w-44 aspect-square bg-white"
              />
            </Button>
            <Popover className="w-[18vw] z-50">
              <ListBox aria-label="1">
                {avatarOption.map(({ text, icon }, idex) => (
                  <ListBoxItem
                    key={idex}
                    id={text}
                    textValue={text}
                    aria-label="1"
                    className="flex gap-2 p-[0.5rem] items-center hover:bg-black hover:bg-opacity-5"
                  >
                    {icon}
                    <span>{text}</span>
                  </ListBoxItem>
                ))}
              </ListBox>
            </Popover>
          </DialogTrigger>
        </div>
        <div className="left-64 absolute text-3xl tracking-wider font-bold flex">
          {user?.firstName} {user?.lastName}
        </div>

        <div className="right-4 absolute flex gap-2 mt-6">
          {isCurrentUser ? (
            <div className="flex gap-2">
              <Button className="flex items-center gap-2">
                <PlusIcon className="h-4 aspect-square" />
                <span className="mt-1">Add Story</span>
              </Button>
              <Button
                variant="primary"
                className="px-2 py-3 bottom-12 flex items-center gap-2 justify-center bg-opacity-20 text-primary-900"
              >
                <PencilIcon className="h-4 aspect-square" />
                <span>Edit Profile</span>
              </Button>
            </div>
          ) : (
            <div>
              {statusFriend?.status.toString() ===
              valueStatusFriend[StatusFriend.isFr] ? (
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <PlusIcon className="h-4 aspect-square" />
                    <span className="mt-1">Friends</span>
                  </Button>
                  <Button
                    variant="primary"
                    className="px-2 py-3 bottom-12 flex items-center gap-2 justify-center bg-opacity-20 text-primary-900"
                  >
                    <span>Message</span>
                  </Button>
                </div>
              ) : (
                <div>
                  {statusFriend?.status.toString() ===
                  valueStatusFriend[StatusFriend.requestFr] ? (
                    <div className="flex gap-2">
                      <Button className="flex items-center gap-2">
                        <PlusIcon className="h-4 aspect-square" />
                        <span className="mt-1">Cancel request</span>
                      </Button>
                      <Button
                        variant="primary"
                        className="px-2 py-3 bottom-12 flex items-center gap-2 justify-center bg-opacity-20 text-primary-900"
                      >
                        <span>Message</span>
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {statusFriend?.status.toString() ===
                      valueStatusFriend[StatusFriend.isRequested] ? (
                        <div className="flex gap-2">
                          <Button className="flex items-center gap-2">
                            <PlusIcon className="h-4 aspect-square" />
                            <span className="mt-1">Accept friend</span>
                          </Button>
                          <Button
                            variant="primary"
                            className="px-2 py-3 bottom-12 flex items-center gap-2 justify-center bg-opacity-20 text-primary-900"
                          >
                            <span>Message</span>
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button className="flex items-center gap-2">
                            <PlusIcon className="h-4 aspect-square" />
                            <span className="mt-1">Add friend</span>
                          </Button>
                          <Button
                            variant="primary"
                            className="px-2 py-3 bottom-12 flex items-center gap-2 justify-center bg-opacity-20 text-primary-900"
                          >
                            <span>Message</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="absolute left-40 bottom-0 mb-2 border px-2 py-1 text-center items-center bg-primary-500 border-solid border-primary-50 rounded-full h-fit w-fit hover:bg-opacity-50"
          onClick={() => setIsOpen(true)}
        >
          <CameraIconSolid className="h-6 pt-1 p-0 aspect-square text-primary-50"></CameraIconSolid>
        </div>
      </div>
      <div className="w-[80vw]">
        <ModalUploadImg
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isExistingButotn={false}
        />
      </div>
      <hr className="border-none outline-none h-[1px] bg-primary-200" />
    </div>
  );
}

export default AvatarIndex;
