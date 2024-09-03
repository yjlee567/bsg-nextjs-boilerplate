import { FC } from "react";
import { PageParams } from "@/types/ui";

interface Props extends PageParams {}

const PageCounter: FC<Props> = ({ page, perPage, total }) => {
  const start = (page - 1) * perPage + 1;
  const end = page * perPage > total ? total : page * perPage;

  return (
    <span className="text-main-gray text-sm">
      <strong className="text-black">{total > 1 ? `${start}-${end}` : "0"}</strong> / {total}
    </span>
  );
};

export default PageCounter;
