"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRunLog } from "@/data/runlog";
import RunLogTable from "./_components/runlog-table";
import { getRunLogAction } from "@/actions/runlog";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableSkeleton } from "../../../../../_components/TableSkeleton";
import { useWorkspace } from "../workspaceProvider";

function RunLog() {
  // const runLog = await getRunLogAction();
  const [runLog, setRunLog] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  const { workspaceId } = useWorkspace();

  const fetchRunLog = async (workspace: string) => {
    const logs = await getRunLogAction(workspace);
    setRunLog(logs);
    setIsLoding(false);
  };

  useEffect(() => {
    fetchRunLog(workspaceId ?? "");

    const intervalId = setInterval(() => fetchRunLog(workspaceId ?? ""), 5000);

    return () => clearInterval(intervalId);
  }, [workspaceId]);

  if (isLoding) {
    return <TableSkeleton></TableSkeleton>;
  }

  return (
    <>
      {runLog.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No runs yet</h3>

            <p className="text-sm text-muted-foreground">You’ll start seeing run logs once you finish your setup.</p>
            <div className="flex flex-col items-center">
              <Button className="mt-4 w-full">
                <Link href="/integrations">Configure Integrations</Link>
              </Button>
              <Button className="mt-4 w-full">
                <Link href="/automations">Install Bots</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex p-4 flex-wrap gap-4">
          <RunLogTable data={runLog}></RunLogTable>
        </div>
      )}
    </>
  );
}

export default RunLog;
