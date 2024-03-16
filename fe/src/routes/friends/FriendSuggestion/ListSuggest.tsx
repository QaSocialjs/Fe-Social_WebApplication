import CardFriendSendReq from "@components/Cards/CardFriendSendReq";
import { hookDispatch } from "@lib/hook/ReduxHook";
import { User } from "@lib/models/User";
import { suggestionUser } from "@lib/redux/suggestion/SuggestionThunk";
import { TypeOfResponse } from "@lib/utils/utils";
import React from "react";
import { useEffect, useState } from "react";

function ListSuggest() {
  const [listUser, setListUser] = useState<User[]>();
  const dispatch: any = hookDispatch();

  useEffect(() => {
    dispatch(suggestionUser("")).then(async (e: any) => {
      const result = TypeOfResponse(e.payload);
      if (result.isOk()) {
        setListUser((await result.value.json()) as User[]);
      }
    });
  }, []);

  return (
    <div className="w-full grid grid-cols-5 place-content-center gap-5">
      {listUser?.map((item, idx) => (
        <CardFriendSendReq
          id={item.id!}
          key={idx}
          name={item.firstName + " " + item.lastName}
          avt={item.avatar!}
          gender={item.gender!}
          idx={idx}
        ></CardFriendSendReq>
      ))}
    </div>
  );
}

export default React.memo(ListSuggest);
