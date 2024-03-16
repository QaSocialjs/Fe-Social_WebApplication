import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { ar1X1 } from "@cloudinary/url-gen/qualifiers/aspectRatio";
import AvatarClient from "@components/AvatarClient";
import Button from "@components/Button";
import ProgressCircle from "@components/ProgressCricle";
import { Transition } from "@headlessui/react";
import { useBoxAlertContext } from "@lib/context/BoxAlertcontext";
import { UseSocketContext } from "@lib/context/SocketIocontext";
import { UseUserContext } from "@lib/context/usercontext";
import { AssetInfo } from "@lib/models/AssetInfo";
import { Gender } from "@lib/models/User";
import { toImage } from "@lib/utils/service.assetInfo";
import { Key, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  name: string;
  avt: AssetInfo;
  gender: number;
  id: string;
  idx: number;
};

function CardFriendSendReq({ name, avt, gender, id, idx }: Props) {
  const { t } = useTranslation();
  const [loading, setloading] = useState<boolean>(false);
  const { user } = UseUserContext();
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const { setBody, setIsShowing, setTitle, setVariant } = useBoxAlertContext();
  const [avatar] = useState(
    avt
      ? toImage(avt)
          .resize(fill().aspectRatio(ar1X1()))
          .resize(scale(256, 256))
          .delivery(dpr("auto"))
          .format("auto")
          .quality("auto")
          .toURL()
      : undefined
  );

  const { socketIo } = UseSocketContext();
  function handleAddFriend(idFr: string) {
    setloading(true);
    if (socketIo) {
      socketIo.emit("makeFriend", { id: user?.id!, idFr: idFr });
      socketIo.on("sendFriendReqError", (e) => {
        setIsShowing(true);
        setBody(e.message);
        setTitle("Error");
        setVariant("negative");
      });
      socketIo.on("sendReqSuccess", (e) => {
        setIsShowing(true);
        setBody(e.message);
        setTitle("Ok");
        setVariant("positive");
      });
      setloading(false);
    }
  }
  useEffect(() => {
    if (status == null) return;
    const timer = setTimeout(() => {
      setStatus(null);
    }, 1500);
    return () => clearTimeout(timer);
  }, [status]);
  function handleRemove() {}
  return (
    <div
      key={idx}
      className="w-fit flex flex-col bg-primary-100 justify-center items-center border border-solid p-2 rounded-md border-primary-200"
    >
      <AvatarClient
        src={avatar}
        fallbackConfig={{
          sex: gender === Gender.Male ? "man" : "woman",
        }}
        className="w-48 rounded-none"
      />
      <div className="font-medium my-2">{name}</div>
      <div className="flex flex-col gap-2">
        <Button
          onPress={() => handleAddFriend(id)}
          className="p-2 relative"
          isDisabled={loading}
        >
          <Transition
            show={loading === true}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3"
            enter="transition ease-in-out"
            enterFrom="opacity-0 scale-0"
            leave="transition ease-in-out duration-300"
            leaveTo="opacity-0 scale-0"
          >
            <ProgressCircle
              aria-label="signing in"
              className="h-full text-primary-500"
            ></ProgressCircle>
          </Transition>
          {t("friends.suggest.btnAdd")}
        </Button>
        <Button
          onPress={handleRemove}
          className="bg-opacity-80 p-2 w-44"
          variant="primary"
        >
          {t("friends.suggest.btnDel")}
        </Button>
      </div>
    </div>
  );
}

export default CardFriendSendReq;
