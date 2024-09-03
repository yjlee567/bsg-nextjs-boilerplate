"use client";

import { FC } from "react";
import { PageParams } from "@/types/ui";
import { cn } from "@/utils/styles";
import PerPageSelector from "./PerPageSelector";
import PageCounter from "./PageCounter";
import PaginationControls from "./PaginationControls";

interface PaginationProps {
  pageParams?: PageParams;
  className?: string;
  onChange?: (pageParams: Partial<PageParams>) => void;
}

const Pagination: FC<PaginationProps> = ({
  pageParams = { page: 1, total: 0, perPage: 10 },
  className,
  onChange,
}) => {
  return (
    <div className={cn("flex justify-between mt-4 flex-wrap gap-2", className)}>
      {/* page selector */}
      <div className="flex items-center gap-4">
        <PerPageSelector onChange={onChange} {...pageParams} />

        {/* page counter */}
        <PageCounter {...pageParams} />
      </div>

      {/* pagination */}
      <PaginationControls onChange={onChange} {...pageParams} />
    </div>
  );
};

export default Pagination;
