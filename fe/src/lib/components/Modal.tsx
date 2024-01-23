import {
  Dialog,
  DialogTrigger,
  Modal as ModalAria,
  ModalOverlay,
  ModalOverlayProps,
} from "react-aria-components";
import Button from "./Button";
import { Dispatch, SetStateAction } from "react";

export type ModalProps = ModalOverlayProps &
  React.RefAttributes<HTMLDivElement> & {
    isExistingButotn: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    childrenButton?:
      | React.ReactNode
      | ((values: any) => React.ReactNode)
      | string;
  };
function Modal({
  children,
  isExistingButotn,
  childrenButton,
  isOpen,
  setIsOpen,
}: ModalProps) {
  return (
    <DialogTrigger>
      {isExistingButotn ? (
        <Button onPress={() => setIsOpen}>{childrenButton}</Button>
      ) : null}
      <ModalOverlay
        className={({ isEntering, isExiting }) => `
          fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur
          ${isEntering ? "animate-in fade-in duration-300 ease-out" : ""}
          ${isExiting ? "animate-out fade-out duration-200 ease-in" : ""}
        `}
        isOpen={isOpen}
      >
        <ModalAria
          className={({ isEntering, isExiting }) => `
            w-fit max-w-4xl overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl
            ${isEntering ? "animate-in zoom-in-95 ease-out duration-300" : ""}
            ${isExiting ? "animate-out zoom-out-95 ease-in duration-200" : ""}
          `}
        >
          <Dialog role="alertdialog" className="outline-none relative">
            <>{children}</>
          </Dialog>
        </ModalAria>
      </ModalOverlay>
    </DialogTrigger>
  );
}

export default Modal;
