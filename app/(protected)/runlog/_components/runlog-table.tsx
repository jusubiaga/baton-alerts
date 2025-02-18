"use client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Play, Search, Trash } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow, subDays } from "date-fns";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RunlogList from "./RunLogList";

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
import { RunlogDetailSheet } from "./RunlogDetailSheet";
import { getRunLogDetailAction } from "@/actions/runlog";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },

  {
    accessorKey: "idLabel",
    id: "idLabel",
    header: "Run ID",

    cell: ({ row }) => <div className="capitalize">{row.getValue("idLabel")}</div>,
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
  //   accessorKey: "edit",
  //   header: "Edit",
  //   cell: ({ row }) => {
  //     return <RunlogDetailSheet data={row}></RunlogDetailSheet>;
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
  const [selectedRow, setSelectedRow] = useState<any | null>(null); // Controlar la fila seleccionada
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Controlar si el Sheet está abierto

  const router = useRouter();

  // const handleRowClick = (id: string) => {
  //   console.log("RunLogTable selected: ", id);
  //   router.push(`/runlog/${id}`);
  // };

  // const fetchRunLogDetail = async (id) => {
  //   const req = await getRunLogDetailAction(id);
  //   console.log("DETAIL:", req);
  //   setRunLogDetail(req);
  // };

  const handleRowClick = async (row: any) => {
    setSelectedRow(row.original); // Guardar la fila seleccionada
    setIsSheetOpen(true); // Abrir el Sheet
    // const r = await fetchRunLogDetail(row?.original?.botId);
    // setSelectedRow(r);
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
    <>
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
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
                      // onClick={() => handleRowClick(row.original?.id)}
                      onClick={() => handleRowClick(row)}
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

      {/* <RunlogDetailSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        data={selectedRow}
      ></RunlogDetailSheet> */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-[625px]">
          <SheetHeader>
            <SheetTitle>Log details ({selectedRow?.idLabel})</SheetTitle>
            <SheetDescription>
              {/* <p>BOT ID: {selectedRow?.botId}</p>
              <p>ID: {selectedRow?.id}</p>
              <p>Rule: {selectedRow?.rule}</p>
              <p>Status: {selectedRow?.status}</p> */}
            </SheetDescription>
          </SheetHeader>
          <RunlogList bot={selectedRow}></RunlogList>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
