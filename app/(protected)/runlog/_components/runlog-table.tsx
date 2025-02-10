"use client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Play, Search, Trash } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow, subDays } from "date-fns";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },

  {
    accessorKey: "id",
    id: "code",
    header: "Run ID",

    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "rule",
    id: "ruleName",
    header: "Bot",
    size: 370,
    cell: ({ row }) => <div className="capitalize">{row.getValue("ruleName")}</div>,
  },

  {
    accessorKey: "status",
    header: "Status",
    size: 470,
    cell: ({ row }) => {
      const status =
        row.getValue("status") === "RUNNING"
          ? "Running"
          : row.getValue("status") === "NO_FOUND_ISSUES"
          ? "No issue"
          : `${row.original?.error} issues`;
      return (
        <div className="flex items-center">
          {row.getValue("status") === "RUNNING" ? (
            <div className="h-3 w-3 rounded-full mr-2 bg-gray-400"></div>
          ) : row.getValue("status") === "FOUND_ISSUES" ? (
            <div className="h-3 w-3 rounded-full mr-2 bg-red-400"></div>
          ) : (
            <div className="h-3 w-3 rounded-full mr-2 bg-green-400"></div>
          )}

          <div className="capitalize">{status}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }) => {
      const result = formatDistanceToNow(new Date(`${row.getValue("createdAt")}`), {
        addSuffix: true,
      });
      return <div className="capitalize">{result}</div>;
    },
  },

  // {
  //   id: "actions",
  //   header: "Action",
  //   cell: ({ row }) => {
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem>
  //             <Pencil className="mr-2 h-4 w-4" />
  //             <span>Edit</span>
  //           </DropdownMenuItem>
  //           {/* <DropdownMenuSeparator /> */}
  //           <DropdownMenuItem>
  //             <Trash className="mr-2 h-4 w-4" />
  //             <span>Delete</span>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export default function RunLogTable({ data }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();

  const handleRowClick = (id: string) => {
    console.log("RunLogTable selected: ", id);
    router.push(`/runlog/${id}`);
  };

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

  return (
    <div className="h-[80%]">
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} style={{ width: header.getSize() }}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                    onClick={() => handleRowClick(row.original?.id)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
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
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
