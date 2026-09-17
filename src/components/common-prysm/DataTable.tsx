"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import CButton from "@/components/common/Button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  showFilters?: boolean;
  showPagination?: boolean;
  tableClassName?: string;
  defaultPageSize?: number;
}

const DataTable = <T,>({
  columns,
  data,
  showFilters = true,
  showPagination = true,
  tableClassName = "min-h-96",
  defaultPageSize = 20,
}: DataTableProps<T>) => {
  const pageCountOptions = [5, 10, 20, 50];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    if (!defaultPageSize) return;
    table.setPageSize(defaultPageSize);
  }, [defaultPageSize]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const getCollapsingPageNumbers = () => {
    const pageCount = table.getPageCount();
    const current = table.getState().pagination.pageIndex;
    const pages: (number | string)[] = [];

    if (pageCount <= 7) {
      // Show all pages
      for (let i = 0; i < pageCount; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(0);

      // Show left ellipsis
      if (current > 3) pages.push("…");

      // Show middle pages
      for (
        let i = Math.max(1, current - 1);
        i <= Math.min(pageCount - 2, current + 1);
        i++
      ) {
        pages.push(i);
      }

      // Show right ellipsis
      if (current < pageCount - 4) pages.push("…");

      // Always show last page
      pages.push(pageCount - 1);
    }

    return pages.map((p, idx) =>
      p === "…" ? (
        <span key={idx} className="px-2 text-white/50">
          …
        </span>
      ) : (
        <Button
          key={p}
          variant={p === current ? "outline" : "ghost"}
          size="sm"
          onClick={() => table.setPageIndex(p as number)}
        >
          {(p as number) + 1}
        </Button>
      )
    );
  };

  return (
    <div className="w-full h-full">
      {showFilters && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="h-full rounded-md border">
        <Table className={cn(tableClassName)}>
          <TableHeader className="bg-[#121212]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="min-w-14">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="min-w-14">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="h-full">
                <TableCell
                  colSpan={columns.length}
                  className="min-h-48 h-48 text-center text-white/60"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className="flex items-center justify-between py-4 px-2">
          {/* Rows per page selector */}
          <div className="flex items-center gap-4">
            {/* <span className="text-sm text-white/70">Rows per page</span> */}
            <div className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="text-xs text-muted-foreground">
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}{" "}
                to{" "}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{" "}
                of {table.getFilteredRowModel().rows.length}
              </span>{" "}
              entries
            </div>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="text-xs text-muted-foreground">Per page</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-8 px-1.5 rounded-lg">
                  {table.getState().pagination.pageSize} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                // align="end"
                className="max-w-16 bg-[#101010] text-white border-white/10"
              >
                {pageCountOptions.map((count) => {
                  return (
                    <DropdownMenuItem
                      key={count}
                      className="flex items-center justify-center hover:!bg-white/10 transition"
                      onClick={() => table.setPageSize(count)}
                    >
                      {count}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Pagination info + controls */}
          <div className="flex items-center gap-4">
            {/* <span className="text-sm text-muted-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              –
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{" "}
              of {table.getFilteredRowModel().rows.length}
            </span> */}

            {!!table.getFilteredSelectedRowModel().rows.length && (
              <div className="text-muted-foreground flex-1 text-xs">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
            )}

            {/* Page navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <FaChevronLeft />
              </Button>

              {/* Collapsing Page Numbers */}
              {getCollapsingPageNumbers()}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <FaChevronRight />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* {showPagination && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default DataTable;
