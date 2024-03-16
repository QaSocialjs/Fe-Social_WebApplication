import Button from "@components/Button";
import { UseUserContext } from "@lib/context/usercontext";
import { useState } from "react";
import FormIntroInfo from "./FormIntroInfo";

function IntroInfo() {
  const { user, setIsLoading } = UseUserContext();
  const [userBio, setUserBio] = useState<boolean>(false);
  return (
    <div className="w-full border border-solid border-primary-200 h-fit rounded py-3 px-4 grid gap-5">
      <h4 className="m-0 p-0 font-bold tracking-wide">Intro</h4>
      <div className="w-full">
        {userBio ? (
          <FormIntroInfo
            isOpen={userBio}
            setIsOpen={setUserBio}
            userBio={user?.bio}
            setIsLoading={setIsLoading}
          />
        ) : (
          <div className="grid text-center">
            <span>{user?.bio}</span>
            <Button
              className="w-full p-2 bg-primary-200 bg-opacity-30 text-sm text-primary-950"
              variant="primary"
              onPress={() => setUserBio(true)}
            >
              {user?.bio ? "Edit" : "Add bio"}
            </Button>
          </div>
        )}
      </div>
      <div className="w-full">
        <Button
          className="w-full p-2 bg-primary-200 bg-opacity-30 text-sm text-primary-950"
          variant="primary"
        >
          Edit details
        </Button>
      </div>
      <div className="w-full">
        <Button
          className="w-full p-2 bg-primary-200 bg-opacity-30 text-sm text-primary-950"
          variant="primary"
        >
          Edit feature
        </Button>
      </div>
    </div>
  );
}

export default IntroInfo;
