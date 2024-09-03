import { alignVariants } from "@/utils/styles";
import { VariantProps } from "class-variance-authority";
import { ReactNode, MouseEventHandler, LazyExoticComponent, ComponentType } from "react";

interface Item {
  label: string | JSX.Element;
  value: string | number | boolean;
}

interface DropdownItem extends Item {
  type: "dropdownItem";
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children?: DropdownItem[];
}

interface GroupLabel {
  type: "groupLabel";
  label: string;
}

interface Separator {
  type: "separator";
}

type DropdownItemType = DropdownItem | GroupLabel | Separator;
type DropdownItems = DropdownItemType[];

/* Table */
interface Column {
  id: string;
  label: string | JSX.Element;
  width?: number | "auto";
  headerAlign?: VariantProps<typeof alignVariants>["align"];
  dataAlign?: VariantProps<typeof alignVariants>["align"];
  sorted?: boolean;
  hidden?: boolean;
  headerClassName?: string;
  dataClassName?: string;
  /**
   * 테이블 cell에 렌더링할 커스텀 컴포넌트
   * @param value cell value
   * @param rowData row data (object)
   * @param tableDatas table 전체 data (array)
   * @param idx 현재 row의 index
   */
  render?: (value: any, rowData: Row, tableDatas: Row[], idx: number) => JSX.Element;
}

interface Row {
  id: string | number;
  [key: string]: any;
}

/* Sort */
interface Sort {
  sortId: Column["id"];
  sortBy: "asc" | "desc" | "none";
}

/* Tabs */
interface Tab extends Item {
  content: ReactNode;
}

interface DynamicTab extends Item {
  path: string;
}

/* Pagination */
interface PageParams {
  total: number;
  perPage: number;
  page: number;
}

/* Position: Style */
type Position = "top-center" | "top-right" | "bottom-right";

/* Width: Style */
type Width = "default" | "auto" | "fit";

/* TreeView */
interface TreeViewItem {
  id: string;
  label: string;
  href?: string;
  children?: TreeViewItem[];
}

export type {
  Item,
  DropdownItemType,
  DropdownItems,
  DropdownItem,
  Column,
  Row,
  Sort,
  Position,
  Tab,
  DynamicTab,
  PageParams,
  Width,
  TreeViewItem,
};
