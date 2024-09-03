import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const DashboardContainer: FC<Props> = ({ children }) => {
  return <div className="flex flex-col h-full">{children && children}</div>;
};

export default DashboardContainer;
