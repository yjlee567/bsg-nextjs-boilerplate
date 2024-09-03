"use client";

import { FC } from "react";
import { Input, Label } from "@/components/ui";
import { Props as InputProps } from "../Input";

interface Props extends InputProps {
  label: string;
  id?: string;
}

const InputWithLabel: FC<Props> = ({ label, id, ...props }) => {
  const inputId = id || label;
  return (
    <div className="left-1/2 grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} {...props} />
    </div>
  );
};

export default InputWithLabel;
