import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  actions?: ReactNode;
}

const DashboardTopBar: FC<Props> = ({ children, actions }) => {
  return (
    <div className="flex items-center justify-between gap-2 p-4 bg-main-white rounded-md mb-4">
      <div className="flex items-center flex-wrap gap-4 text-sm">{children && children}</div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

export default DashboardTopBar;
