import { FC, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { PageParams } from "@/types/ui";

interface Props extends PageParams {
  onChange?: (pageParams: Partial<PageParams>) => void;
}

const PAGE_RANGES = 5;

const PaginationControls: FC<Props> = ({ page, total, perPage, onChange }) => {
  const lastPage = Math.ceil(total / perPage);
  const [pageRanges, setPageRanges] = useState<number[]>([]);

  const handleChangePage = (page: number) => {
    if (page < 1 || page > lastPage) return;
    onChange?.({ page });
  };

  useLayoutEffect(() => {
    if (lastPage <= PAGE_RANGES) {
      setPageRanges(Array.from({ length: lastPage }, (_, i) => i + 1));
      return;
    }

    if (1 + page <= 3) {
      setPageRanges(Array.from({ length: PAGE_RANGES }, (_, i) => i + 1));
      return;
    }

    if (lastPage - page <= 2) {
      setPageRanges(Array.from({ length: PAGE_RANGES }, (_, i) => lastPage - 4 + i));
      return;
    }

    setPageRanges([page - 2, page - 1, page, page + 1, page + 2]);
  }, [page, lastPage]);

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={"text"}
        disabled={page === 1}
        size={"icon-sm"}
        onClick={() => handleChangePage(1)}
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>
      <Button
        variant={"text"}
        disabled={page === 1}
        size={"icon-sm"}
        onClick={() => handleChangePage(page - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      {pageRanges.map(range => (
        <Button
          key={range}
          variant={range === page ? "outline" : "text"}
          size={"icon-sm"}
          onClick={() => handleChangePage(range)}
        >
          {range}
        </Button>
      ))}
      <Button
        variant={"text"}
        disabled={page === lastPage || total === 0}
        size={"icon-sm"}
        onClick={() => handleChangePage(page + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button
        variant={"text"}
        disabled={page === lastPage || total === 0}
        size={"icon-sm"}
        onClick={() => handleChangePage(lastPage)}
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default PaginationControls;
