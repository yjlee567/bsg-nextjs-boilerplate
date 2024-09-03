"use client";

import { forwardRef, InputHTMLAttributes, KeyboardEvent, useCallback } from "react";
import { cn } from "@/utils/styles";
import { Button } from "@/components/ui";
import { CircleX } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-md border bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-main-gray focus-visible:outline-none focus:border-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9 text-sm px-2 py-1",
        md: "h-10 text-sm px-3 py-2",
        lg: "h-12 text-base px-4 py-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  size?: "sm" | "md" | "lg";
  error?: boolean;
  onClear?: () => void;
  onEnter?: () => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ value, className, type, error, size, onClear, onEnter, ...props }, ref) => {
    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          onEnter?.();
        }
      },
      [onEnter],
    );

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            inputVariants({ size }),
            {
              "pr-10": onClear,
              "border-error focus:border-error": error,
            },
            className,
          )}
          value={value}
          ref={ref}
          onKeyDown={handleKeyDown}
          {...props}
        />
        {value && onClear && (
          <Button
            variant={"text"}
            className="absolute top-1/2 right-0 -translate-y-1/2 hover:bg-transparent text-main-gray"
            size="icon"
            onClick={onClear}
          >
            <CircleX className="w-3 h-3" />
          </Button>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
