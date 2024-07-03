"use client";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { MoreHorizontal, Pencil, Play, Search, Trash } from "lucide-react";
import { useState } from "react";

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

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCatalogById } from "@/data/catalogs";
import { toast } from "sonner";
import AddBotsButton from "./addBotsButton";
import { BotEditForm } from "./editBotsButton";
import { Description } from "@radix-ui/react-dialog";

// export type Payment = {
//   id: string;
//   code: string;
//   name: string;
//   avatar: string;
//   lastRun?: string;
//   nextRun?: string;
// };

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     code: "FVT",
//     name: "Frontify Video Uploader for TikTok",
//     avatar: "/googleAds.png",
//     lastRun: "3 minutes ago",
//     nextRun: "Tomorrow at 3:30pm",
//   },
//   {
//     id: "3u1reuv4",
//     code: "FTU",
//     name: "Frontify AI metadata tagger",
//     avatar: "/googleAds.png",
//     lastRun: "10 minutes ago",
//     nextRun: "Next Friday at 3:30pm",
//   },
// ];

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="flex items-center gap-2">{row.getValue("id")}</div>,
  },

  {
    accessorKey: "rule.id",
    id: "ruleId",
    header: "Bot ID",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-[40px] h-[40px]">
          <Avatar>
            <AvatarImage src={row.original.rule.avatar} alt="@cald" />
            <AvatarFallback>I</AvatarFallback>
          </Avatar>
        </div>
        {row.getValue("ruleId")}
      </div>
    ),
  },
  {
    accessorKey: "rule.name",
    id: "ruleName",
    header: "Bot name",
    size: 770,
    cell: ({ row }) => <div className="capitalize">{row.getValue("ruleName")}</div>,
  },
  {
    accessorKey: "lastRun",
    header: "Last Run",
    cell: ({ row }) => <div className="capitalize">{"lastRun"}</div>,
  },
  {
    accessorKey: "nextRun",
    header: "Next Run",
    cell: ({ row }) => <div className="capitalize">{"nextRun"}</div>,
  },
  {
    accessorKey: "edit",
    header: "Edit",
    cell: ({ row }) => {
      const data = {
        id: row.original.id,
        avatar: row.original.rule.avatar,
        name: row.original.rule.name,
        description: row.original.rule.description,
        frequency: row.original.frequency,
        hour: row.original.hour,
        min: row.original.min,
        minimumNumber: row.original.min,
      };
      return <BotEditForm buttonLabel="Edit" data={data}></BotEditForm>;
    },
  },

  {
    id: "actions",
    header: () => <AddBotsButton className="mt-4 w-full" buttonLabel="Add"></AddBotsButton>,
    cell: ({ row }) => {
      const handleDelete = async (event: any) => {
        console.log("handleDelete", event);
        const del = await deleteCatalogById(event.id);
        toast("Delete");
      };

      return (
        <>
          <Button variant="outline" size="icon" onClick={() => handleDelete(row.original)}>
            <Trash className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Play className="h-4 w-4" />
          </Button>
        </>

        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //     <Button variant="ghost" className="h-8 w-8 p-0">
        //       <span className="sr-only">Open menu</span>
        //       <MoreHorizontal className="h-4 w-4" />
        //     </Button>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //     <DropdownMenuItem>
        //       <Pencil className="mr-2 h-4 w-4" />
        //       <BotEditForm buttonLabel="edit"></BotEditForm>
        //       <span>Edit</span>
        //     </DropdownMenuItem>
        //     {/* <DropdownMenuSeparator /> */}
        //     <DropdownMenuItem onClick={() => handleDelete(row.original)}>
        //       <Trash className="mr-2 h-4 w-4" />
        //       <span>Delete</span>
        //     </DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      );
    },
  },
];

export default function CatalogTable({ data }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
  });
  const [rowSelection, setRowSelection] = useState({});

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
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
        {/* <div className="flex items-center justify-end space-x-2 py-4">
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
        </div> */}
      </div>
    </div>
  );
}
