import { TargetPortal } from "@/utils";
import { Portal } from "..";
import { ToastContainer } from "react-toastify";

export const Toast = () => {
  return (
    <Portal target={TargetPortal.TOAST}>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </Portal>
  );
};
