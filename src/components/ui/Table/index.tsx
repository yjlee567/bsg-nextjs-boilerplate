"use client";

import {
  CSSProperties,
  FC,
  forwardRef,
  HTMLAttributes,
  memo,
  TdHTMLAttributes,
  ThHTMLAttributes,
  useId,
} from "react";
import { Eye } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { alignVariants, cn } from "@/utils/styles";
import { Column, Sort, Row } from "@/types/ui";
import { Skeleton, Dropdown, Button, SortIcon } from "@/components/ui";
import useTable from "./useTable";

const TableContainer = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn("grid w-full relative caption-bottom text-sm", className)}
      {...props}
    />
  ),
);
TableContainer.displayName = "TableContainer";

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = memo(
  forwardRef<
    HTMLTableRowElement,
    HTMLAttributes<HTMLTableRowElement> & {
      selected?: boolean;
    }
  >(({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "flex border-b transition-colors hover:bg-muted/40",
        {
          "bg-muted hover:bg-muted": selected,
        },
        className,
      )}
      {...props}
    />
  )),
);
TableRow.displayName = "TableRow";

const TableHead = forwardRef<
  HTMLTableCellElement,
  VariantProps<typeof alignVariants> &
    ThHTMLAttributes<HTMLTableCellElement> & {
      sorted?: boolean;
      currentKey?: string;
      sortParams?: Sort;
      dense?: boolean;
      onSortChange?: TableProps["onSortChange"];
    }
>(
  (
    {
      currentKey = "",
      className,
      style,
      children,
      sorted,
      align,
      sortParams: { sortBy, sortId } = {},
      dense,
      onSortChange,
      ...props
    },
    ref,
  ) => {
    const handleClickHead = () => {
      if (!sorted) return;

      if (sortId !== currentKey) {
        onSortChange?.(currentKey, "asc");
        return;
      }

      switch (sortBy) {
        case "asc":
          onSortChange?.(currentKey, "desc");
          return;
        case "desc":
          onSortChange?.(currentKey, "none");
          return;
        default:
          onSortChange?.(currentKey, "asc");
      }
    };

    return (
      <th
        ref={ref}
        className={cn(
          "group h-12 px-4 flex items-center gap-2 text-left align-middle content-center font-medium text-main-gray [&:has([role=checkbox])]:pr-0",
          {
            "cursor-pointer": sorted,
            "h-10": dense,
          },
          alignVariants({ align }),
          className,
        )}
        align={align}
        style={style}
        onClick={handleClickHead}
        {...props}
      >
        <span>{children}</span>
        {sorted && <SortIcon sortBy={sortBy} selected={sortId === currentKey} />}
      </th>
    );
  },
);
TableHead.displayName = "TableHead";

const TableCell = memo(
  forwardRef<
    HTMLTableCellElement,
    TdHTMLAttributes<HTMLTableCellElement> &
      VariantProps<typeof alignVariants> & {
        dense?: boolean;
      }
  >(({ className, style, align, dense, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0 e truncate",
        alignVariants({ align }),
        {
          "text-sm py-3": dense,
        },
        className,
      )}
      style={style}
      {...props}
    />
  )),
);
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-main-gray", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";

interface TableLoadingProps {
  columns: Column[];
  rowLength: number;
  style?: CSSProperties;
  dense?: boolean;
}

const TableLoading: FC<TableLoadingProps> = ({ columns, rowLength, style, dense }) => {
  return (
    <div className="grow w-full overflow-hidden">
      <TableContainer>
        <TableHeader>
          <TableRow>
            {columns.map(({ id, label, width, headerAlign = "center" }) => (
              <TableHead
                key={id}
                className={cn(`text-center`)}
                align={headerAlign || "center"}
                style={style}
                dense={dense}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowLength }).map((_, index) => (
            <TableRow key={`loader-tr-${index}`} className="align-middle border-b">
              {Array.from({ length: columns.length }).map((_, index) => (
                <TableCell
                  key={`loader-td-${index}`}
                  className={cn(`flex items-center justify-center`)}
                  style={style}
                  dense={dense}
                >
                  <Skeleton className="w-20 h-5" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
};

interface TableProps {
  id?: string;
  columns: Column[];
  rows: Row[];
  caption?: string;
  /**
   * 테이블을 감싸고 있는 컨테이너의 클래스
   */
  containerClassName?: string;
  /**
   * 데이터가 없을 때 표시할 메시지
   * @default: "데이터가 없습니다."
   */
  emptyMessage?: string;
  /**
   * 로딩 상태. 로딩 중엔 테이블을 Skeleton으로 대체
   * @default false
   */
  loading?: boolean;
  /**
   * 테이블의 높이를 고정할지 여부
   * @default true
   */
  fixedHeight?: boolean;
  /**
   * 툴바를 표시할지 여부
   * - 툴바를 표시하면 툴바에 있는 버튼을 통해 테이블의 컬럼을 선택할 수 있음
   * @default false
   */
  showToolbar?: boolean;
  /**
   * 테이블의 첫 번째 컬럼에 체크박스를 표시할지 여부
   * @default false
   */
  showCheckbox?: boolean;
  /**
   * 데이터 정렬 파라미터
   */
  sortParams?: Sort;
  /**
   * 선택된 row의 id 목록
   */
  selectedRows?: Row["id"][];
  /**
   * 로딩 중일 때 표시할 row의 개수
   * @default 5
   */
  loadingRowLength?: number;
  /**
   * 테이블의 밀도가 높은지 여부 -> true 설정시 테이블의 height 줄어듦
   * @default false
   */
  dense?: boolean;
  /**
   * 컬럼의 정렬 상태가 변경됐을 때 호출되는 함수
   * @param sortId
   * @param sortBy
   */
  onSortChange?: (sortId: Sort["sortId"], sortBy: Sort["sortBy"]) => void;
  /**
   * row를 클릭했을 때 호출되는 함수
   * @param id 선택된 row의 id
   */
  onSelectRow?: (id: Row["id"]) => void;
  /**
   * 헤더의 전체 체크박스를 선택했을 때 호출되는 함수
   * @param ids 선택된 row id 목록
   */
  onSelectAll?: (ids: Row["id"][]) => void;
  /**
   * 테이블의 기본 컬럼 설정으로 기본값이 없을 때 적용됨
   * - width: 컬럼의 너비(column의 개별 width 다음으로 적용)
   */
  defaultColumn?: {
    width?: Column["width"];
  };
}

const Table: FC<TableProps> = ({
  id = `table-${useId()}`,
  columns,
  rows,
  containerClassName,
  emptyMessage = "데이터가 없습니다.",
  caption = "",
  loading = false,
  fixedHeight = true,
  showToolbar = false,
  showCheckbox = false,
  selectedRows,
  sortParams,
  loadingRowLength = 10,
  dense = false,
  onSortChange,
  onSelectRow,
  onSelectAll,
  defaultColumn = { width: "auto" },
}) => {
  const table = useTable({
    id,
    columns,
    rows,
    showCheckbox,
    showToolbar,
    selectedRows,
    onSelectRow,
    onSelectAll,
  });

  if (loading) {
    return (
      <TableLoading
        columns={columns}
        rowLength={loadingRowLength}
        style={table.getWidthStyles()}
        dense={dense}
      />
    );
  }

  if (!rows.length) {
    return <div className="flex items-center justify-center text-sm py-4">{emptyMessage}</div>;
  }

  return (
    <div
      className={cn("w-full grow min-h-0 flex flex-col", {
        containerClassName,
      })}
    >
      {showToolbar && (
        <div className="w-full flex flex-row-reverse mb-2">
          <Dropdown
            align="end"
            list={table.toolbar.list}
            checkedList={table.toolbar.checkedList}
            onCheckedChange={table.toolbar.onCheckedChange}
            minWidth="fit"
            showConfirmButton
          >
            <Button variant="outline" className="shadow-sm h-8 px-3">
              <Eye className="h-4 w-4 mr-2" />
              <span>View</span>
            </Button>
          </Dropdown>
        </div>
      )}
      <div className="grow w-full overflow-auto">
        <TableContainer>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader
            className={cn({
              "sticky top-0 z-10 bg-white": fixedHeight,
            })}
          >
            <TableRow>
              {table.visibleColumns.map(
                ({ id, label, width, headerAlign = "center", sorted, headerClassName }) => (
                  <TableHead
                    key={id}
                    currentKey={id}
                    sorted={sorted}
                    sortParams={sortParams}
                    onSortChange={onSortChange}
                    align={headerAlign || "center"}
                    style={table.getWidthStyles(width || defaultColumn.width)}
                    className={headerClassName}
                    dense={dense}
                  >
                    {label}
                  </TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody onClick={table.handleClickRow}>
            {table.rows.map((row, rowIdx) => (
              <TableRow
                key={`${row.id}-${rowIdx}`}
                id={(row.id || "").toString()}
                selected={table.selectedRows.includes(row.id)}
              >
                {table.visibleColumns.map((column, columnIdx) => {
                  const { id, dataAlign = "left", render, width, dataClassName } = column;
                  return (
                    <TableCell
                      key={`${id}-${rowIdx}-${columnIdx}`}
                      align={dataAlign || "left"}
                      style={table.getWidthStyles(width || defaultColumn.width)}
                      className={dataClassName}
                      dense={dense}
                    >
                      {render ? render(row[id], rows[rowIdx], rows, rowIdx) : row[id]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </div>
    </div>
  );
};

export default Table;
