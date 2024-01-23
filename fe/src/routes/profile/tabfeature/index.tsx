import Tabs from "@components/tab/Tabs";
import { useState } from "react";
import { PropsTabFeature } from "./listdatatab";
import Post from "./Post";
import About from "./About/About";
import { useLocation, useParams } from "react-router";
import { User } from "@lib/models/User";

export type userProfileProps = {
  user: User;
  isCurrentUser: boolean;
};
function TabFeatureProfile({ user, isCurrentUser }: userProfileProps) {
  if (!user) {
    return;
  }
  const { pathname } = useLocation();
  const { id } = useParams();
  const [items] = useState<PropsTabFeature[]>([
    {
      label: "Post",
      panel: <Post></Post>,
      href: ("/" + id) as string,
    },
    {
      label: "About",
      panel: <About />,
      href: ("/" + id + "/about") as string,
    },
    {
      label: "Friends",
      panel: <About />,
      href: ("/" + id + "/friends") as string,
    },
    {
      label: "Photos",
      panel: <About />,
      href: ("/" + id + "/Photos") as string,
    },
    {
      label: "Videos",
      panel: <About />,
      href: ("/" + id + "/Videos") as string,
    },
  ]);
  return (
    <Tabs
      items={items}
      className="pt-2 w-[70vw] flex justify-center items-center"
      selectedKey={pathname}
      pathname={pathname}
      tabListclassName=" flex w-full "
      tabPanelclassName="bg-primary-50 flex w-[70vw] justify-center"
    />
  );
}

export default TabFeatureProfile;
