"use client";

import { useToastStore } from "@/store/";
import { Portal, Toast, ToastWrapper } from "@/components/ui/";

const ToastContainer = () => {
  const { toasts, dismissToast } = useToastStore();

  return (
    <Portal id="toast">
      <ToastWrapper position="bottom-right">
        {toasts.map(toast => (
          <Toast key={toast.id} id={toast.id} duration={3000} onClose={dismissToast}>
            {toast.message}
          </Toast>
        ))}
      </ToastWrapper>
    </Portal>
  );
};

export default ToastContainer;
