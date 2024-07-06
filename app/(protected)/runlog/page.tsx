import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRunLog } from "@/data/runlog";
import RunLogTable from "./_components/runlog-table";

async function RunLog() {
  const runLog = await getRunLog();

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
