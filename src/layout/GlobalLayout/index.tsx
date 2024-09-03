import { FC, ReactNode } from "react";
import { AlertContainer, ModalContainer, MenuLoader, ToastContainer, AuthLoader } from "@/global";
import LoadingContainer from "@/global/LoadingContainer";

interface Props {
  children: ReactNode;
}

const GlobalLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <AuthLoader />
      <MenuLoader />
      <ToastContainer />
      <AlertContainer />
      <ModalContainer />
      <LoadingContainer />
      {children}
    </>
  );
};

export default GlobalLayout;
