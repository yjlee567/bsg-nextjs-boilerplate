"use client";

import { FC, ReactNode } from "react";
import { Aside, Header } from "./components";
import { cn } from "@/utils/styles";
import { useGlobalSetting } from "@/hooks";

interface Props {
  children: ReactNode;
  title?: string;
  fixedHeight?: boolean;
  hasPadding?: boolean;
}

const DashboardLayout: FC<Props> = ({ children, title, fixedHeight = true, hasPadding = true }) => {
  const { collapsed } = useGlobalSetting();

  return (
    <div className={cn("flex h-screen w-full", {})}>
      <Aside />
      <div className="grow relative flex flex-col overflow-auto col-auto">
        <Header title={title} />
        <main
          className={cn("flex flex-1 flex-col gap-4 lg:gap-6 bg-muted", {
            "min-h-0": fixedHeight,
            "p-4": hasPadding,
          })}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
