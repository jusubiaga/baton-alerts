import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ArrowUpDown, Search } from "lucide-react";
import { useEffect, useState } from "react";

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
import { getBotAction } from "@/actions/bot";
import { addRuleToCatalog } from "@/data/catalogs";
import { toast } from "sonner";

const ActionButton = ({ row }: any) => {
  const handleInstall = async () => {
    console.log("handleInstall");
    const newCatalog = {
      tags: "",
      active: true,
      ruleId: row.original?.id,
    };

    const catalog = await addRuleToCatalog(newCatalog);
    console.log("int: ", catalog);
    if (catalog) {
      toast.success("Data Success");
    } else {
      toast.success("Data Error");
    }
  };

  const handleNotifyMe = () => {
    console.log("handleNotifyMe");
  };

  return (
    <>
      {row.original.available ? (
        <Button variant="default" onClick={handleInstall}>
          Install
        </Button>
      ) : (
        <Button variant="outline" onClick={handleNotifyMe}>
          Notify Me
        </Button>
      )}
    </>
  );
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Bot ID",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-[40px] h-[40px]">
          <Avatar>
            <AvatarImage src={row.original.avatar} alt="@cald" />
            <AvatarFallback>I</AvatarFallback>
          </Avatar>
        </div>
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Bot Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "available",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => <div className="capitalize">{row.getValue("available") ? "Available" : "Coming soon"}</div>,
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => <ActionButton row={row}></ActionButton>,
  },
];

type BotCatalogTableProps = {
  search: string;
};

export default function BotCatalogTable({ search }: BotCatalogTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Array<any>>([]);

  const rulesData = async () => {
    console.log("rulesData");
    const bots = await getBotAction();
    setData(() => bots as Array<any>);
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

  useEffect(() => {
    rulesData();
  }, []);

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(search);
  }, [search]);

  return (
    <div className="h-[80%]">
      {/* <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="type to search ..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div> */}

      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
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
