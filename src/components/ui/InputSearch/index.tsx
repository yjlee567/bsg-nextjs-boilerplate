"use client";

import { FC } from "react";
import { Search } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { Props as InputProps } from "../Input";

interface Props extends InputProps {}

const InputSearch: FC<Props> = ({ ...props }) => {
  return (
    <div className="relative">
      <Input className="pr-10" {...props} />
      <Button
        variant={"text"}
        className="absolute top-1/2 right-0 -translate-y-1/2 hover:bg-transparent"
        size="icon"
      >
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default InputSearch;
