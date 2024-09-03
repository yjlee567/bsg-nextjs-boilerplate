import { FC, ReactNode } from "react";
import { Header } from "./components";

interface Props {
  children: ReactNode;
}

const PortalLayout: FC<Props> = ({ children }) => {
  return (
    <div className="grid h-screen w-full grid-rows-[auto_1fr]">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default PortalLayout;
