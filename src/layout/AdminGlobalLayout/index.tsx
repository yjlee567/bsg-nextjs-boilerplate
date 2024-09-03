import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminGlobalLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminGlobalLayout;
