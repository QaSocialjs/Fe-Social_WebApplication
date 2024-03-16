import { BuildingLibraryIcon, GlobeAltIcon } from "@heroicons/react/24/solid";
import { UseUserContext } from "@lib/context/usercontext";
import { hookDispatch } from "@lib/hook/ReduxHook";
import { User } from "@lib/models/User";
import { getUserId } from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { formatDate } from "@lib/utils/date";
import { Ok, ResultAsync } from "neverthrow";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OverView() {
  const { user, setIsLoading } = UseUserContext();
  const { id } = useParams();
  const dispatch = hookDispatch();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  useEffect(() => {
    if (!user) return;
    if (user.id === id) {
      setUserProfile(user);
    } else {
      dispatch(getUserId({ id: id! })).then(async (e) => {
        const response = e.payload as Ok<
          Response,
          void | Error | ApiError | ResultAsync<never, ApiError>
        >;
        if (response.isOk()) {
          setUserProfile((await response.value.json()) as User);
        }
      });
    }
  }, [user]);
  return (
    <div className="px-6 py-2 w-full flex flex-col">
      {userProfile?.city?.nameCity ? (
        <div>
          <h4 className="text-base font-semibold">Place lived</h4>

          <div className="flex gap-2 items-center">
            <GlobeAltIcon className="h-10 aspect-square"></GlobeAltIcon>
            <div className="flex flex-col">
              <span className="tracking-wide font-medium">
                Come from:
                {userProfile?.city!.nameCity}
              </span>
              <span className="text-xs font-medium text-primary-950 text-opacity-70">
                time: {formatDate(userProfile.city.time.toString())}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {userProfile?.work ? (
        <div>
          <h4 className="text-base font-semibold">Work</h4>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <BuildingLibraryIcon className="h-10 aspect-square"></BuildingLibraryIcon>
              <div className="flex flex-col">
                <span className="tracking-wide font-medium">
                  {userProfile?.work.position}{" "}
                  <span className="font-normal">at</span>{" "}
                  {userProfile?.work.company}
                </span>
                <span className="text-xs font-medium text-primary-950 text-opacity-70">
                  form{" "}
                  <span className="font-bold">
                    {formatDate(userProfile.startWork?.toString()!)}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold">
                    {formatDate(userProfile.endWork?.toString()!)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default OverView;
