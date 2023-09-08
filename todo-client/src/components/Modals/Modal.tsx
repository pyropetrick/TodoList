import { FC, PropsWithChildren, useEffect } from "react";
import { Portal } from "..";
import { TargetPortal } from "@/utils";
import ReactFocusLock from "react-focus-lock";

type Props = {
  isVisible: boolean;
  hideModal: () => void;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  isVisible,
  hideModal,
}) => {
  useEffect(() => {
    const body = document.body;
    if (isVisible) {
      body.classList.add("overflow-hidden");
    }

    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Portal target={TargetPortal.MODAL}>
      <ReactFocusLock>
        <div
          onClick={hideModal}
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          className="fixed z-10 top-0 left-0 w-screen h-screen bg-black opacity-50 backdrop-blur-sm"
        />
        <div
          className="fixed z-20 top-2/4 left-1/2 bg-white py-6 px-10 rounded-lg"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {children}
        </div>
      </ReactFocusLock>
    </Portal>
  );
};
