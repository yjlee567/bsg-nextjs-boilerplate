import { FC, ReactNode } from "react";
import { AlertContainer } from "@/global";

interface Props {
  children: ReactNode;
}

const LoginGlobalLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <AlertContainer />
      {children}
    </>
  );
};

export default LoginGlobalLayout;
