"use client";
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
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createBotAction } from "@/actions/bot";
import { toast } from "sonner";
import { getRulesAction } from "@/actions/rules";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkspace } from "../../workspaceProvider";

enum InstaledStutus {
  "INSTALL" = "Install",
  "INSTALING" = "Instaling",
  "INSTALLED" = "Installed",
  "ERROR" = "Error",
}

const ActionButton = ({ workspace, row, onUpdate }: { workspace: string; row: any; onUpdate: () => void }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [installLabel, setInstallLabel] = useState(
    row.original.installed ? InstaledStutus.INSTALLED : InstaledStutus.INSTALL
  );

  const { workspaceId } = useWorkspace();

  const handleInstall = async () => {
    console.log("handleInstall");

    setIsLoading(true);
    setInstallLabel(InstaledStutus.INSTALING);

    const catalog = await createBotAction(workspace, row.original?.id);
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

  const { workspaceId } = useWorkspace();

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
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => {
        return (
          <ActionButton
            key={row.original.id}
            workspace={workspaceId ?? ""}
            row={row}
            onUpdate={() => rulesData(workspaceId ?? "")}
          ></ActionButton>
        );
      },
    },
  ];

  const rulesData = async (workspace: string) => {
    console.log("WORKSPACE: ", workspace);
    setLoading(true); // Activa el estado de carga
    try {
      const bots = await getRulesAction(workspace);
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
    rulesData(workspaceId ?? "");
  }, [workspaceId]);

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(search);
  }, [search]);

  return (
    <div className="h-[80%]">
      <div className="w-full">
        <div className="rounded-md border">
          <ScrollArea className="w-full h-96">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="text-center">
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
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
