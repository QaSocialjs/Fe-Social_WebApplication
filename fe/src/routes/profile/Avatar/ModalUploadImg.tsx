import Button from "@components/Button";
import FileTrigger from "@components/FileTrigger";
import Modal, { ModalProps } from "@components/Modal";
import ProgressCircle from "@components/ProgressCricle";
import { Transition } from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { hookDispatch } from "@lib/hook/ReduxHook";
import { PatchAvatarUser, RequestImg } from "@lib/redux/user/UserThunk";
import { ApiError } from "@lib/services/ErrorApi";
import { JsonPatch } from "@lib/utils/service.assetInfo";
import clsx from "clsx";
import { Ok, ResultAsync } from "neverthrow";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useNavigate, useParams } from "react-router";

type Props = ModalProps;
interface Patch {
  key: any;
  version: any;
  format: any;
}

function ModalUploadImg({ ...props }: Props) {
  const [fileRef, setFileRef] = useState<File | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [patch, setPatch] = useState<Patch | null>(null);
  const dispatch = hookDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const a = async () => {
    try {
      dispatch(RequestImg({ id: id! })).then((e) => {
        setLoading(true);
        const result = e.payload as Ok<
          Response,
          void | Error | ApiError | ResultAsync<never, ApiError>
        >;
        console.log(result);
        if (result.isOk()) {
          if (editorRef.current) {
            editorRef.current.getImageScaledToCanvas().toBlob(async (blob) => {
              if (blob) {
                const formData = new FormData();
                formData.set("file", blob);
                const url = (await result.value.json()) as string;
                const response = await fetch(url, {
                  method: "POST",
                  body: formData,
                });
                if (response.ok) {
                  const data = await response.json();
                  console.log(data);
                  setPatch((e) => ({
                    ...e,
                    format: data.format,
                    key: data.public_id,
                    version: data.version,
                  }));
                }
              }
            });
          }
        }
      });
    } finally {
    }
  };
  useEffect(() => {
    if (!patch) {
      return;
    }
    const jsonPatch: JsonPatch = {
      jsonpatch: [
        {
          op: "replace",
          path: "/avatar/key",
          value: patch.key,
        },
        {
          op: "replace",
          path: "/avatar/version",
          value: patch.version,
        },
        {
          op: "replace",
          path: "/avatar/format",
          value: patch.format,
        },
      ],
    };
    dispatch(PatchAvatarUser({ id: id!, patch: jsonPatch })).then((e) => {
      const result = e.payload as Ok<
        Response,
        void | Error | ApiError | ResultAsync<never, ApiError>
      >;
      console.log(result.isOk());
      if (result.isOk()) {
        setLoading(false);
        setFileRef(null);
        editorRef.current = null;
        navigate(`/${id}`);
      }
    });
  }, [patch]);

  return (
    <Modal {...props}>
      <div className="w-[50vw] flex flex-col gap-2">
        <div className="justify-between flex items-center p-6">
          <h3 className="font-semibold leading-6 m-0 text-primary-400">
            Choose your picture
          </h3>
          <Button
            className="text-primary-950 px-2 py-1 rounded-full bg-opacity-50"
            variant="primary"
            onPress={() => props.setIsOpen(false)}
          >
            <XMarkIcon className="text-primary-50 mt-1 h-5 aspect-square"></XMarkIcon>
          </Button>
        </div>
        <hr className="h-[1px] bg-primary-200 outline-none w-full" />
        {fileRef ? (
          <div className="w-full justify-center flex items-center flex-col">
            <Transition
              show={fileRef ? true : false}
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="p-6">
                <AvatarEditor
                  ref={editorRef}
                  image={fileRef}
                  width={550}
                  height={300}
                />
              </div>
            </Transition>
            <hr className="h-[1px] bg-primary-200 outline-none w-full" />
            <div className="flex w-full justify-end p-6 gap-4">
              <Button
                className="text-right mt-5 py-2 px-3 bg-primary-200 text-primary-950"
                onPress={() => setFileRef(null)}
                variant="primary"
              >
                <span className="flex items-center justify-center gap-2">
                  Cancel
                </span>
              </Button>
              <Button
                className="text-right mt-5 py-2 px-6 relative"
                onPress={a}
              >
                <span
                  className={clsx("block transition ease-in-out", {
                    "opacity-0": loading === true,
                    "scale-0": loading === true,
                  })}
                >
                  Save
                </span>
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
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <FileTrigger
              onSelect={(e) => {
                const file = e?.item(0);
                if (!file) {
                  return;
                }
                setFileRef(file);
              }}
              acceptedFileTypes={["image/*"]}
            >
              <Button className="w-full text-center mt-5 p-2">
                <span className="flex items-center justify-center gap-2">
                  <PlusIcon className="h-5 aspect-square" />
                  Upload Photo
                </span>
              </Button>
            </FileTrigger>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ModalUploadImg;
