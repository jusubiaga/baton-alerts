"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteCatalogById } from "@/data/catalogs";
import { toast } from "sonner";
import AddBotsButton from "./addbot-button";
import { BotForm } from "./bot-form";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { deleteBotAction } from "@/actions/bot";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CheckCircle, CircleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ButtonDeleteBotProps = {
  id: string;
};
const ButtonDeleteBot = ({ id }: ButtonDeleteBotProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    console.log("handleDelete", id);
    const del = await deleteBotAction(id);

    router.refresh();
    toast.success("The bot has been removed");
    // setIsLoading(false);
  };
  return (
    <Button variant="outline" size="icon" onClick={() => handleDelete(id)} disabled={isLoading}>
      {isLoading ? <Loader2 className="animate-spin" /> : <Trash className="h-4 w-4" />}
    </Button>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="flex items-center gap-2">{row.getValue("id")}</div>,
  },

  {
    accessorKey: "rule",
    id: "ruleId",
    header: "Bot ID",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-[40px] h-[40px]">
          <Avatar>
            <AvatarImage src={row.original?.avatar} alt="@cald" />
            <AvatarFallback>I</AvatarFallback>
          </Avatar>
        </div>
        {row.getValue("ruleId")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    id: "ruleName",
    header: "Bot name",
    size: 770,
    cell: ({ row }) => <div className="capitalize">{row.getValue("ruleName")}</div>,
  },
  {
    accessorKey: "lastRunDate",
    header: "Last Run",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("lastRunDate")
          ? format(new Date(row.getValue("lastRunDate")), "dd MMM yyyy HH:mm:ss", { locale: enUS })
          : null}
      </div>
    ),
  },
  {
    accessorKey: "nextRunDate",
    header: "Next Run",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("nextRunDate")
          ? format(new Date(row.getValue("nextRunDate")), "dd MMM yyyy HH:mm:ss", { locale: enUS })
          : null}
      </div>
    ),
  },
  {
    accessorKey: "edit",
    header: "",
    cell: ({ row }) => {
      const data = {
        id: row.original.id,
        avatar: row.original.avatar,
        name: row.original.name,
        description: row.original.description,
        frequency: row.original.frequency,
        hour: row.original.hour,
        min: row.original.min,
        minimumNumber: row.original.minimumNumber,
        ruleId: row.original.ruleId,
      };
      return <BotForm buttonLabel="Edit" data={data}></BotForm>;
    },
    size: 50,
  },

  {
    id: "actions",
    header: "",
    // () => <AddBotsButton className="mt-4 w-full" buttonLabel="Add"></AddBotsButton>,
    cell: ({ row }) => {
      const handleDelete = async (event: any) => {
        console.log("handleDelete", event);
        const del = await deleteBotAction(event.id);

        toast("Delete");
      };

      return <ButtonDeleteBot key={row.original.id} id={row.original.id} />;
    },
    size: 50,
  },

  {
    accessorKey: "frequency",
    header: "",
    cell: ({ row }) => (
      <>
        {row.getValue("frequency") === "" ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <CircleAlert size={24} color="#ef4444" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="center"
                sideOffset={5}
                className="bg-white text-black border border-gray-300 shadow-md"
              >
                <p>Needs to configure.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </>
    ),
  },
];

export default function AutomationsTable({ data }: any) {
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
        <div className="w-full flex justify-end mb-4">
          <AddBotsButton className="mt-4" buttonLabel="Add Bot"></AddBotsButton>
        </div>

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
