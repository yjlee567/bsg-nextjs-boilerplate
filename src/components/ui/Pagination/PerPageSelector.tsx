"use client";

import { FC, useMemo, useState } from "react";
import { SelectBox } from "@/components/ui";
import { Item, PageParams } from "@/types/ui";

interface Props {
  /**
   * @default [10, 20, 30]
   */
  range?: number[];
  perPage?: PageParams["perPage"];
  onChange?: (pageParams: Partial<PageParams>) => void;
}

const PerPageSelector: FC<Props> = ({ range = [10, 20, 30], perPage, onChange }) => {
  const [currPerPage, setCurrPerPage] = useState(perPage);
  const selectItems = useMemo(
    () => range.map(item => ({ label: item.toString(), value: item.toString() }) as Item),
    [range],
  );

  const handleChangePerPage = (value: string) => {
    onChange?.({ perPage: parseInt(value), page: 1 });
  };

  return (
    <div className="w-20">
      <SelectBox
        currentItem={selectItems.find(item => item.value === perPage?.toString()) || selectItems[0]}
        list={selectItems}
        onValueChange={handleChangePerPage}
        className="h-8"
      />
    </div>
  );
};

export default PerPageSelector;
