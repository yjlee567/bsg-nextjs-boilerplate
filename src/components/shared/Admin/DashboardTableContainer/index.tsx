import { cn } from "@/utils/styles";
import { FC, ReactNode } from "react";

interface Props {
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}

const DashboardTableContainer: FC<Props> = ({ title, actions, children }) => {
  return (
    <div className={cn("flex flex-col gap-4 h-full bg-main-white rounded-md p-4")}>
      <div className={cn("flex items-center justify-between")}>
        <h3 className="text-xl">{title}</h3>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {children && children}
    </div>
  );
};

export default DashboardTableContainer;
