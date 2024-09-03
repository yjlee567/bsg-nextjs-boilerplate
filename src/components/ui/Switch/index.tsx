"use client";

import { FC, ChangeEvent, InputHTMLAttributes, useId, useState, useEffect } from "react";
import { cn } from "@/utils/styles";
import { cva, VariantProps } from "class-variance-authority";

const switchVariants = cva(
  "relative flex items-center w-7 h-4 rounded-2xl p-0.5 cursor-pointer data-[state=unchecked]:bg-main-gray/40 data-[disabled=disabled]:cursor-default data-[disabled=disabled]:opacity-40",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-info",
        primary: "data-[state=checked]:bg-primary",
        info: "data-[state=checked]:bg-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface Props extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof switchVariants> {
  label?: string;
  onChangeChecked?: (checked: boolean, value: Props["value"]) => void;
}

const Switch: FC<Props> = ({
  id,
  label,
  name,
  className = "",
  variant,
  disabled = false,
  checked = false,
  onChange,
  onChangeChecked,
  ...props
}) => {
  const labelId = id || `switch-${useId()}`;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const { value, checked } = e.target;
    onChange && onChange(e);
    onChangeChecked && onChangeChecked(checked, value);
  };

  return (
    <div
      className={cn(switchVariants({ variant }), className)}
      data-state={checked ? "checked" : "unchecked"}
      data-disabled={disabled ? "disabled" : "undisabled"}
    >
      <input
        id={labelId}
        type="checkbox"
        className={`opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer disabled:cursor-default z-[1]`}
        name={name}
        onChange={handleChange}
        checked={checked}
        disabled={disabled}
        aria-disabled={disabled}
        aria-checked={checked}
        aria-label={label}
        {...props}
      />
      <div
        className={cn("w-3 h-3 rounded-full bg-main-white transition ease-linear", {
          "transform translate-x-full": checked && !disabled,
        })}
      />
      <label className="hidden" htmlFor={labelId}>
        {label}
      </label>
    </div>
  );
};
export default Switch;
