import Button from "@components/Button";
import {
  BuildingLibraryIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { UseUserContext } from "@lib/context/usercontext";
import { hookDispatch } from "@lib/hook/ReduxHook";
import { User } from "@lib/models/User";
import { getUserId } from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { Ok, ResultAsync } from "neverthrow";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FormAddWork from "./FormAddWork";
import { formatDate } from "@lib/utils/date";
import { DialogTrigger, ListBox } from "react-aria-components";
import Popover from "@components/Popover";
import ListBoxItem from "@components/ListBoxItem";
import FormEditWork from "./FormEditWork";

function Work() {
  const { user, setIsLoading } = UseUserContext();
  const { id } = useParams();
  const dispatch = hookDispatch();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [isAddWork, setIsAddWork] = useState<boolean>(false);
  const [isEditWork, setIsEditWork] = useState<boolean>(false);
  const [editWork] = useState([
    {
      icon: <PencilIcon className="h-5 aspect-square" />,
      text: "Edit work",
      action: "edit",
    },
    {
      icon: <TrashIcon className="h-5 aspect-square" />,
      text: "Delete work",
      action: "delete",
    },
  ]);
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
        if (response.isErr()) {
          navigate("/error/authenticatedError");
        }
        if (response.isOk()) {
          setUserProfile((await response.value.json()) as User);
        }
      });
    }
  }, [user]);
  function handleAction(action: string) {
    if (action === "edit") {
      setIsEditWork(true);
      setIsAddWork(false);
    }
  }
  return (
    <div>
      {isCurrentUser ? (
        <div>
          {userProfile?.work ? (
            <div>
              {isEditWork ? (
                <FormEditWork
                  setIsEditWork={setIsEditWork}
                  setIsLoading={setIsLoading}
                  user={user!}
                />
              ) : (
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
                  <div className="mb-6">
                    <DialogTrigger>
                      <Button
                        className="absolute bg-primary-200 bg-opacity-50 border-4 rounded-full px-1 py-0 mt-0"
                        variant="primary"
                      >
                        <EllipsisHorizontalIcon className="h-7 aspect-square text-primary-950 mt-1" />
                      </Button>
                      <Popover className="w-[18vw] z-50">
                        <ListBox aria-label="1">
                          {editWork.map(({ text, icon, action }, idex) => (
                            <ListBoxItem
                              key={idex}
                              id={text}
                              textValue={text}
                              aria-label="1"
                              className="flex gap-2 p-[0.5rem] items-center hover:bg-black hover:bg-opacity-5"
                            >
                              <Button
                                variant="primary"
                                className="w-full h-full text-left flex items-center py-1 px-1 gap-2 bg-transparent text-primary-950"
                                onPress={() => handleAction(action)}
                                // isDisabled={isloadingDelete}
                              >
                                {icon}
                                <span className="mt-1">{text}</span>
                              </Button>
                            </ListBoxItem>
                          ))}
                        </ListBox>
                      </Popover>
                    </DialogTrigger>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {isAddWork ? (
                <div>
                  <FormAddWork
                    setIsAddWork={setIsAddWork}
                    setIsLoading={setIsLoading}
                  />
                </div>
              ) : (
                <Button
                  className="flex gap-2 items-center py-2"
                  onPress={() => setIsAddWork(true)}
                >
                  <PlusCircleIcon className="h-7 aspect-square"></PlusCircleIcon>
                  <span className="">Add work</span>
                </Button>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Work;
