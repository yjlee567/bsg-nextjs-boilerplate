"use client";

import { useState, FC, ReactNode, useEffect } from "react";
import { cn, positionVariant } from "@/utils/styles";
import { Position } from "@/types/ui";

interface WrapperProps {
  position: Position;
  children: ReactNode;
}

const ToastWrapper: FC<WrapperProps> = ({ position, children }) => {
  return <div className={cn("grid gap-2 text-sm", positionVariant({ position }))}>{children}</div>;
};

interface Props {
  id: string;
  duration?: number;
  className?: string;
  children: ReactNode;
  onClose?: (id: string) => void;
}

const Toast: FC<Props> = ({ id, duration = 3000, className, children, onClose }) => {
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.(id);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setRemoving(true);
    }, duration - 200);

    return () => {
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <div
      className={cn(
        "md:min-w-[420px] relative flex items-center justify-between rounded-md bg-primary/90 text-white border p-3 md:p-5 shadow-lg",
        {
          "animate-toast-in": !removing,
          "animate-toast-out": removing,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export { ToastWrapper, Toast };
