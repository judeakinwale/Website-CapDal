import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import React, { FC, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table"; // Adjust import path to your shadcn table components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Column<T> = {
  header: React.ReactNode;
  field: string;
  render?: (value: any, object: T, objectArr: T[]) => React.ReactNode;
};

const columns: Column<any>[] = [
  { header: "Pair / Token", field: "token" },
  { header: "Side", field: "side" },
  { header: "Market CAP", field: "marketCap" },
  { header: "Liquidity", field: "liquidity" },
  { header: "Volume", field: "volume" },
];

type Action<T> = {
  label: React.ReactNode;
  onClick: (object: T, objectArr: T[]) => void;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  filterField?: string; // optional: field to filter by
};

export function getValueByField(obj: any, field: string) {
  return field.split(".").reduce((acc, key) => acc?.[key], obj);
}

const SimpleTable = <T extends object>({
  columns,
  data,
  actions,
  filterField,
}: DataTableProps<T>) => {
  const [filter, setFilter] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!filterField || !filter) return data;
    return data.filter((item) => {
      const value = getValueByField(item, filterField);
      return String(value ?? "")
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
  }, [data, filter, filterField]);

  return (
    <div className="h-[400px] xl:h-[130px] 2xl:h-[335px] overflow-y-auto custom-scrollbar  text-white/80">
      <div className="space-y-4">
        {filterField && (
          <Input
            placeholder={`Filter by ${filterField}`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
        )}
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx}>{col.header}</TableHead>
              ))}
              {actions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {columns.map((col, colIdx) => {
                  const value = getValueByField(row, col.field);
                  return (
                    <TableCell key={colIdx}>
                      {col.render
                        ? col.render(value, row, filteredData)
                        : String(value)}
                    </TableCell>
                  );
                })}
                {actions && (
                  <TableCell>
                    <div className="flex gap-2">
                      {actions.map((action, actIdx) => (
                        <Button
                          key={actIdx}
                          size="sm"
                          onClick={() => action.onClick(row, filteredData)}
                          type="button"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredData.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            No data found.
          </div>
        )}
      </div>
    </div>
  );
};

type PaginationProps = {
  dataLength?: number;
};
const Pagination: FC<PaginationProps> = ({ dataLength = 0 }) => {
  const pageItemCountOptions = [5, 10, 20, 50];
  const totalItems = dataLength; // update this

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    setPageCount(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);
  return (
    <div>
      {/* pagination */}
      <div className="flex justify-between gap-4 px-4 py-2 text-white/50 text-xs">
        <div className="flex items-center gap-4">
          <div className="">
            Showing {totalItems === 0 ? 0 : startIdx} to {endIdx} of{" "}
            {totalItems} entries
          </div>
          <div className="h-full w-px bg-white/10"></div>
          <div className="">per page</div>
          <div className="">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <div className="flex items-center gap-2 border border-white/20 rounded-[10px] px-3 py-1 text-sm text-white bg-[rgba(51,51,52,0.4)] hover:bg-white/5 transition whitespace-nowrap">
                  {itemsPerPage}
                  <img
                    className="h-4 w-4"
                    src="/icons/chevron-down.svg"
                    alt="down"
                  />
                </div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="border border-white/20 rounded-[10px] text-sm text-white bg-[rgba(51,51,52,0.4)]">
                {pageItemCountOptions.map((i) => {
                  return (
                    <>
                      <DropdownMenu.Item
                        className="w-16 px-3 py-1 text-center hover:bg-white/5 transition"
                        onClick={() => setItemsPerPage(i)}
                      >
                        <div className="">{i}</div>
                      </DropdownMenu.Item>
                      {/* <DropdownMenu.Separator /> */}
                    </>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>

        <div className="">
          <div className="flex gap-2 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2 py-1 bg-white/10 text-white rounded disabled:opacity-30"
            >
              &lt;
            </button>
            <span className="border border-white/20 rounded-[10px] px-3 py-1 text-sm text-white bg-[rgba(51,51,52,0.4)]">
              {currentPage}
              {/* / {pageCount} */}
            </span>
            <button
              disabled={currentPage === pageCount}
              onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
              className="px-2 py-1 bg-white/10 text-white rounded disabled:opacity-30"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleTable;
