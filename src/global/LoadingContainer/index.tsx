"use client";

import { useGlobalSetting } from "@/hooks";
import { Loader2 } from "lucide-react";

const LoadingContainer = () => {
  const { isLoading } = useGlobalSetting();

  return isLoading ? (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/30">
      <span className="w-14 h-14">
        <Loader2 width={"100%"} height={"100%"} className="animate-spin text-white" />
      </span>
    </div>
  ) : null;
};

export default LoadingContainer;
