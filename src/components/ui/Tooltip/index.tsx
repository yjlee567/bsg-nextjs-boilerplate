"use client";

import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef, ReactNode } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils/styles";

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContainer = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border-tooltip bg-tooltip px-3 py-1.5 text-sm text-white-foreground shadow-md",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps extends TooltipPrimitive.TooltipContentProps {
  content: string;
  children: ReactNode;
  hasArrow?: boolean;
}

const Tooltip: FC<TooltipProps> = ({ content, children, hasArrow = true, ...props }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <TooltipContainer>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent {...props}>
          {hasArrow && <TooltipArrow className={cn("fill-tooltip")} />}
          <p className="text-white">{content}</p>
        </TooltipContent>
      </TooltipContainer>
    </TooltipProvider>
  );
};

export default Tooltip;
