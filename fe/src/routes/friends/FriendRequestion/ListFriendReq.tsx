import CardRequestFriend from "@components/Cards/CardRequestFriend";
import { useBoxAlertContext } from "@lib/context/BoxAlertcontext";
import { UseSocketContext } from "@lib/context/SocketIocontext";
import { UseUserContext } from "@lib/context/usercontext";
import { hookDispatch } from "@lib/hook/ReduxHook";
import { User } from "@lib/models/User";
import { GetSendRequestFriend } from "@lib/redux/friend/sendRequest/GetSendRequestionThunk";
import { TypeOfResponse } from "@lib/utils/utils";
import { useEffect, useState } from "react";
function ListFriendReq() {
  const [listUser, setListUser] = useState<User[]>();
  const dispatch: any = hookDispatch();
  const { user } = UseUserContext();
  const { socketIo } = UseSocketContext();
  useEffect(() => {
    if (!socketIo) return;
    socketIo.on("re-renderFriendReq", (e) => {
      console.log(e.users);
      setListUser(e.users);
    });
  }, [socketIo]);
  useEffect(() => {
    if (!user?.id) return;

    dispatch(GetSendRequestFriend({ curUserId: user?.id })).then(
      async (e: any) => {
        const result = TypeOfResponse(e.payload);
        console.log(result);
        if (result.isOk()) {
          setListUser(await result.value.json());
        }
      }
    );

    return () => {};
  }, [user?.id]);
  return (
    <div className="w-full grid grid-cols-5 place-content-center p-5 gap-6">
      {listUser?.map((item, idx) => (
        <CardRequestFriend
          id={item.id! ?? idx}
          key={item.id!}
          name={item.firstName + " " + item.lastName}
          avt={item.avatar!}
          gender={item.gender!}
        ></CardRequestFriend>
      ))}
    </div>
  );
}

export default ListFriendReq;
