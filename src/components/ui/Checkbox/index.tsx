"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/utils/styles";
import { cva, VariantProps } from "class-variance-authority";

const checkboxVariants = cva("", {
  variants: {
    variant: {
      default:
        "border-main-black data-[state=checked]:bg-main-black data-[state=checked]:text-snow-white",
      primary:
        "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      info: "border-main-gray/40 text-main-gray data-[state=checked]:bg-info data-[state=checked]:border-info data-[state=checked]:text-info-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "onChange">,
    VariantProps<typeof checkboxVariants> {
  onChange?: (value: boolean, id?: string) => void;
}

const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, checked, onChange, id, variant, ...props }, ref) => {
    const handleChange = (value: boolean) => {
      onChange?.(value, id);
    };

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-primary",
          checkboxVariants({ variant }),
          className,
        )}
        id={id}
        checked={checked}
        onCheckedChange={handleChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center")}>
          {checked === "indeterminate" && <Minus width={"100%"} height={"100%"} />}
          {checked === true && <Check width={"100%"} height={"100%"} />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
