import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
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

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createBotAction, getBotAction } from "@/actions/bot";
import { addRuleToCatalog } from "@/data/catalogs";
import { toast } from "sonner";
import { getRulesAction } from "@/actions/rules";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

enum InstaledStutus {
  "INSTALL" = "Install",
  "INSTALING" = "Instaling",
  "INSTALLED" = "Installed",
  "ERROR" = "Error",
}

const ActionButton = ({ row, onUpdate }: { row: any; onUpdate: () => void }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [installLabel, setInstallLabel] = useState(
    row.original.installed ? InstaledStutus.INSTALLED : InstaledStutus.INSTALL
  );

  const handleInstall = async () => {
    console.log("handleInstall");

    setIsLoading(true);
    setInstallLabel(InstaledStutus.INSTALING);
    const catalog = await createBotAction(row.original?.id);
    console.log("int: ", catalog);
    if (catalog) {
      toast.success("Bot Installed");
      setInstallLabel(InstaledStutus.INSTALLED);
      setIsLoading(false);
      onUpdate();
      router.refresh();
    } else {
      toast.error("Data Error");
    }
  };

  const handleNotifyMe = () => {
    console.log("handleNotifyMe");
  };

  return (
    <>
      {row.original.available ? (
        <Button
          key={row.original?.id}
          variant="default"
          onClick={handleInstall}
          disabled={InstaledStutus.INSTALL === installLabel ? false : true}
        >
          {InstaledStutus.INSTALING === installLabel ? (
            <>
              <Loader2 className="animate-spin mr-2" /> {installLabel}
              {" ..."}
            </>
          ) : (
            installLabel
          )}
        </Button>
      ) : (
        <Button key={row.original?.id} variant="outline" onClick={handleNotifyMe} disabled>
          Notify Me
        </Button>
      )}
    </>
  );
};

// export const columns: ColumnDef<any>[] = [
//   {
//     accessorKey: "id",
//     header: "Bot ID",
//     cell: ({ row }) => (
//       <div className="flex items-center gap-2">
//         <div className="w-[40px] h-[40px]">
//           <Avatar>
//             <AvatarImage src={row.original.avatar} alt="@cald" />
//             <AvatarFallback>I</AvatarFallback>
//           </Avatar>
//         </div>
//         {row.getValue("id")}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
//           Bot Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "available",
//     header: ({ column }) => {
//       return (
//         <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },

//     cell: ({ row }) => <div className="capitalize">{row.getValue("available") ? "Available" : "Coming soon"}</div>,
//   },
//   {
//     accessorKey: "installed",
//     header: "Installed",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("installed") ? "Inst" : "Not Inst"}</div>,
//   },

//   {
//     accessorKey: "action",
//     header: "",
//     cell: ({ row }) => {
//       return <ActionButton key={row.original.id} row={row} onUpdate={() => rulesData()}></ActionButton>;
//     },
//   },
// ];

type BotCatalogTableProps = {
  search: string;
};

export default function BotCatalogTable({ search }: BotCatalogTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Array<any>>([]);

  const [loading, setLoading] = useState(true);

  const columns: ColumnDef<any>[] = [
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
    // {
    //   accessorKey: "available",
    //   header: ({ column }) => {
    //     return (
    //       <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
    //         <ArrowUpDown className="ml-2 h-4 w-4" />
    //       </Button>
    //     );
    //   },

    //   cell: ({ row }) => <Badge variant="outline">{row.getValue("available") ? "Available" : "Coming soon"}</Badge>,
    //   // <div className="capitalize">{row.getValue("available") ? "Available" : "Coming soon"}</div>,
    // },
    // {
    //   accessorKey: "installed",
    //   header: "Installed",
    //   cell: ({ row }) => <div className="capitalize">{row.getValue("installed") ? "Inst" : "Not Inst"}</div>,
    // },

    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => {
        return <ActionButton key={row.original.id} row={row} onUpdate={() => rulesData()}></ActionButton>;
      },
    },
  ];

  const rulesData = async () => {
    // console.log("rulesData");
    // const bots = await getRulesAction();
    // setData(() => bots as Array<any>);
    setLoading(true); // Activa el estado de carga
    try {
      const bots = await getRulesAction();
      setData(bots);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
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
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5, // Limita las filas a 5 por página
      },
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
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-center">
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
                    <div className="space-y-4">
                      {loading
                        ? [...Array(4)].map((_, index) => (
                            <div key={index} className="flex items-center gap-4 p-2 border-b last:border-none">
                              <Skeleton className="h-8 w-8 rounded-full" />
                              <Skeleton className="h-8 w-full" />
                            </div>
                          ))
                        : "No results"}
                    </div>
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
