"use client";

import { Button } from "@/components/ui";
import { Footer, Nav } from ".";
import { Logo } from "@/layout/shared";
import { ArrowLeftFromLine } from "lucide-react";
import { cn } from "@/utils/styles";
import { MouseEvent, useState } from "react";
import { useGlobalSetting } from "@/hooks";

const Aside = () => {
  const { collapsed, setCollapsed } = useGlobalSetting();
  // const [hovered, setHovered] = useState(false);

  // const handleClickAside = (e: MouseEvent) => {
  //   const target = e.target as HTMLElement;
  //   if (target.closest(".nav") || target.closest(".logo")) return;
  //   setCollapsed(!collapsed);
  // };

  // const handleClickCollapseIcon = () => {
  //   setCollapsed(!collapsed);
  // };

  return (
    <div
      className={cn("transition-[width] shrink-0 duration-500 relative hidden border-r bg-bsg-navy text-snow-white md:block", {
        "w-60": !collapsed,
        "w-8": collapsed,
      })}
      // onMouseEnter={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      // onClick={handleClickAside}
    >
      {/* <Button
        variant="outline"
        size="icon-xs"
        className={cn(
          "absolute top-4 -right-2 rounded-full text-main-black border z-10 transition-all shadow-sm",
          {
            "opacity-100 translate-x-1": hovered,
            "opacity-0": !hovered,
          },
        )}
        onClick={handleClickCollapseIcon}
      >
        <ArrowLeftFromLine
          className={cn("w-3 h-3", {
            "rotate-180": collapsed,
          })}
        />
      </Button> */}
      <div className="flex h-full max-h-screen flex-col gap-2">
        <Logo />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Nav />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Aside;
