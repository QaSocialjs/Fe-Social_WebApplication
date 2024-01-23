import Button from "@components/Button";
import { CameraIcon as CameraIconSolid } from "@heroicons/react/24/solid";
import { UseUserContext } from "@lib/context/usercontext";
import AvatarIndex from "./Avatar";
import TabFeatureProfile from "./tabfeature";
import { useEffect, useState } from "react";
import { User } from "@lib/models/User";
import { useNavigate, useParams } from "react-router";
import { hookDispatch } from "@lib/hook/ReduxHook";
import { getUserId } from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { Ok, ResultAsync } from "neverthrow";

function Profile() {
  const { user } = UseUserContext();
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const dispatch = hookDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.id === id) {
      setUserProfile(user);
      setIsCurrentUser(true);
    } else {
      dispatch(getUserId({ id: id! })).then(async (e) => {
        const response = e.payload as Ok<
          Response,
          void | Error | ApiError | ResultAsync<never, ApiError>
        >;
        console.log(response);
        if (response.isErr()) {
          console.log("asdssa");
          navigate("/error/authenticatedError");
        }
        if (response.isOk()) {
          setUserProfile((await response.value.json()) as User);
        }
      });
    }
  }, [user]);

  return (
    <div className="bg-primary-100">
      <div className="h-fit shadow-md flex flex-col group items-center bg-primary-50">
        <div className="h-[50vh] w-[70vw] rounded-lg bg-gradient-to-b from-primary-50 via-primary-100 border border-solid border-primary-100 to-primary-300 relative">
          <Button
            variant="primary"
            className="absolute right-12 p-2 bottom-12 flex items-center gap-2 justify-center bg-opacity-25"
          >
            <CameraIconSolid className="h-5"></CameraIconSolid>
            Add Cover Photo
          </Button>
        </div>
        <AvatarIndex user={userProfile!} />
        <TabFeatureProfile
          user={userProfile!}
          isCurrentUser={isCurrentUser}
        ></TabFeatureProfile>
      </div>
    </div>
  );
}

export default Profile;
