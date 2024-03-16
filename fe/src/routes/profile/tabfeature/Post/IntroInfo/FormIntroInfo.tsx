import Button from "@components/Button";
import Form from "@components/Form";
import TextField from "@components/TextField";
import { Transition } from "@headlessui/react";
import { hookDispatch } from "@lib/hook/ReduxHook";
import { DeleteBioUser, UpdateUser } from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { FormikHelpers } from "formik";
import { Ok, ResultAsync } from "neverthrow";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  userBio?: string;
};
function FormIntroInfo({ isOpen, setIsOpen, userBio, setIsLoading }: Props) {
  const dispatch = hookDispatch();
  const [bio, setBio] = useState<string>(userBio ?? "");
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  function handleUpdate() {
    setLoading(true);
    dispatch(
      UpdateUser({
        id: id!,
        bio: bio,
      })
    ).then(async (e) => {
      const response = e.payload as Ok<
        Response,
        void | Error | ApiError | ResultAsync<never, ApiError>
      >;
      if (response.isErr()) {
        navigate("/error/authenticatedError");
      }
      if (response.isOk()) {
        setIsLoading(true);
      }
      setIsOpen(false);
      setLoading(false);
    });
  }
  function handleDelete() {
    setLoading(true);
    dispatch(
      DeleteBioUser({
        id: id!,
      })
    ).then(async (e) => {
      const response = e.payload as Ok<
        Response,
        void | Error | ApiError | ResultAsync<never, ApiError>
      >;
      if (response.isErr()) {
        navigate("/error/authenticatedError");
      }
      if (response.isOk()) {
        setIsLoading(true);
      }
      setIsOpen(false);
      setLoading(false);
    });
  }
  return (
    <Transition
      show={isOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Form
        className="w-full grid gap-3"
        initialValues={{ bio: userBio ?? "" }}
        isOnblur={false}
        onSubmit={(values: any, formikHelpers: FormikHelpers<any>) => {
          if (bio === "") {
            handleDelete();
          } else {
            handleUpdate();
          }
          formikHelpers.resetForm();
        }}
      >
        <TextField
          name="bio"
          id="bio"
          value={bio}
          onChange={setBio}
          label="Add bio"
          inputClassName="text-base font-bold py-2 bg-primary-100"
          labelClassName="text-base"
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            className="py-2 bg-primary-300 bg-opacity-20 text-primary-950"
            variant="primary"
            onPress={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button type="submit" className="py-2" isDisabled={loading === true}>
            Save
          </Button>
        </div>
      </Form>
    </Transition>
  );
}

export default FormIntroInfo;
