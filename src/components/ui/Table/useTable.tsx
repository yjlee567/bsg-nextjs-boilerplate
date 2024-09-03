"use client";

import { useMemo, useState, useEffect, MouseEvent } from "react";
import { Column, DropdownItem, Row } from "@/types/ui";
import { Checkbox } from "@/components/ui";
import { useSessionStorage } from "@/hooks";

interface Props {
  id: string;
  columns: Column[];
  rows: Row[];
  showToolbar?: boolean;
  showCheckbox?: boolean;
  selectedRows?: Row["id"][];
  onSelectRow?: (id: Row["id"]) => void;
  onSelectAll?: (ids: Row["id"][]) => void;
}

export interface SyntheticColumn extends Column, DropdownItem {
  visible?: boolean;
}

const ROW_CHECKBOX_ID = "rowCheckbox";

const useTable = ({
  id,
  columns: inputColumns,
  rows: inputRows,
  showCheckbox,
  selectedRows,
  onSelectRow,
  onSelectAll,
}: Props) => {
  const rows = useMemo(
    () =>
      showCheckbox
        ? (inputRows.map(row => ({ ...row, [ROW_CHECKBOX_ID]: row.id })) as Row[])
        : inputRows,
    [inputRows],
  );
  const [savedColumns, setSavedColumns] = useSessionStorage<Column["id"][]>(
    id,
    inputColumns.filter(column => !column.hidden).map(column => column.id),
  );
  const [_selectedRows, setSelectedRows] = useState<Row["id"][]>(selectedRows || []);
  const [columns, setColumns] = useState<SyntheticColumn[]>(getInitColumns(inputColumns));

  function getInitColumns(initColumns: Column[]) {
    const newColumns = initColumns.map(column => ({
      ...column,
      value: column.id,
      type: "dropdownItem",
      visible: true,
    })) as SyntheticColumn[];

    const filteredColumns = newColumns.map(column =>
      savedColumns.includes(column.id)
        ? { ...column, visible: true }
        : { ...column, visible: false },
    );

    return showCheckbox
      ? ([getCheckboxColumn(), ...filteredColumns] as SyntheticColumn[])
      : filteredColumns;
  }

  function getCheckboxColumn() {
    return {
      id: ROW_CHECKBOX_ID,
      label: (
        <Checkbox
          id="table-checkbox"
          variant={"info"}
          checked={getCheckedState()}
          onChange={handleChangeAllCheckbox}
        />
      ),
      type: "dropdownItem",
      value: ROW_CHECKBOX_ID,
      visible: true,
      width: 50,
      headerClassName: "px-0",
      dataClassName: "px-0 flex items-center justify-center",
      dataAlign: "center",
      render: (item: any) => {
        return (
          <Checkbox id={item} checked={selectedRows?.includes(item.toString())} variant={"info"} />
        );
      },
    } as SyntheticColumn;
  }

  function handleClickRow(e: MouseEvent<HTMLTableSectionElement>) {
    const row = (e.target as HTMLTableCellElement).closest("tr");
    if (row) {
      const isNumberType = inputRows.length ? typeof inputRows[0].id === "number" : false;
      const id = row.id;
      onSelectRow?.(isNumberType ? Number(id) : id);
      if (id && showCheckbox) {
        setSelectedRows(prev => {
          if (prev.includes(id)) {
            return prev.filter(rowId => rowId !== id);
          }
          return [...prev, id];
        });
      }
    }
  }

  function handleCheckedChangeInToolbar(newValues: DropdownItem["value"][]) {
    setColumns(prev => prev.map(column => ({ ...column, visible: newValues.includes(column.id) })));
    setSavedColumns(newValues as Column["id"][]);
  }

  function getFilteredColumns(callback?: (column: SyntheticColumn) => boolean | undefined) {
    return columns.filter(column => {
      const combinedValue = !column.hidden;

      if (callback) {
        return combinedValue && callback(column);
      }
      return combinedValue;
    });
  }

  function handleChangeAllCheckbox(checked: boolean) {
    const _selectedRows = selectedRows || [];
    const rowIds = inputRows.map(row => row.id);
    const newSelectedRows = checked
      ? Array.from(new Set([..._selectedRows, ...rowIds]))
      : _selectedRows.filter(row => !rowIds.includes(row));
    setSelectedRows(newSelectedRows);
    onSelectAll?.(newSelectedRows);
  }

  function getCheckedState() {
    const currRowIds = inputRows.map(row => row.id);
    const currSelectedRowLength = _selectedRows.filter(row => currRowIds.includes(row)).length;
    const currRowsLength = currRowIds.length;

    if (!currSelectedRowLength) return false;

    if (currSelectedRowLength === currRowsLength) {
      return true;
    }

    return "indeterminate";
  }

  function getWidthStyles(width?: Column["width"]) {
    return typeof width === "number" ? { width: `${width}px`, flexShrink: 0 } : { flex: "1" };
  }

  useEffect(() => {
    if (selectedRows) {
      setSelectedRows(selectedRows);
    }
  }, [selectedRows]);

  useEffect(() => {
    setColumns(getInitColumns(inputColumns));
  }, [_selectedRows.length, inputRows]);

  return {
    columns,
    rows,
    toolbar: {
      list: getFilteredColumns(column => column.id !== ROW_CHECKBOX_ID),
      checkedList: getFilteredColumns(column => column.visible).map(column => column.id),
      onCheckedChange: handleCheckedChangeInToolbar,
    },
    visibleColumns: getFilteredColumns(column => column.visible),
    selectedRows: _selectedRows,
    getWidthStyles,
    handleClickRow,
  };
};

export default useTable;
