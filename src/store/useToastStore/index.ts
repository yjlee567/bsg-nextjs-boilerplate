import createCombinedStore from "../createStore";

export interface ToastProps {
  id: string;
  message: string;
}

interface Props {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
  dismissToast: (id: string) => void;
  removeToast: () => void;
}

const initialState = {
  duration: 3000,
  toasts: [],
};

const useToastStore = createCombinedStore<Props>(set => ({
  ...initialState,
  addToast: (toast: ToastProps) => set(state => ({ toasts: [...state.toasts, toast] })),
  dismissToast: (id: string) =>
    set(state => ({ toasts: state.toasts.filter(toast => toast.id !== id) })),
  removeToast: () => set({ toasts: [] }),
}));

export default useToastStore;
