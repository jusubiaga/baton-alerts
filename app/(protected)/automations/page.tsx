import { Separator } from "@/components/ui/separator";
import { getCatalogs } from "@/data/catalogs";
import AutomationsTable from "./_components/catalogsTable";
import AddRule from "./_components/addRule";
import { getRules } from "@/data/rules";
import { Rule } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Link from "next/link";

async function Automations() {
  const catalogs = await getCatalogs();
  const rules: Rule[] = await getRules();
  console.log("CATALOGS: ", catalogs);

  return (
    <div>
      <header className="flex justify-between m-3">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight place-self-center">Automations</h1>
        <div>
          <AddRule data={rules}></AddRule>
          <Button className="ml-5">
            <Play className="mr-2 h-4 w-4" /> <Link href="/alerts">Run</Link>
          </Button>
        </div>
      </header>
      <Separator />
      <div className="container">
        <AutomationsTable data={catalogs}></AutomationsTable>
      </div>
    </div>
  );
}

export default Automations;
