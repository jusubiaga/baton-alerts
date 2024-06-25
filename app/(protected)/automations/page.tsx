import { Separator } from "@/components/ui/separator";
import { getCatalogs } from "@/data/catalogs";
import AutomationsTable from "./_components/catalogsTable";
import AddBotsButton from "./_components/addBotsButton";
import { getRules } from "@/data/rules";
import { Rule } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";
import CatalogTable from "./_components/catalogsTable";

async function Automations() {
  const catalogs = await getCatalogs();
  const rules: Rule[] = await getRules();
  console.log("CATALOGS: ", catalogs);

  return (
    <>
      {catalogs.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No bots installed yet</h3>

            <p className="text-sm text-muted-foreground">Please install an configure one or more bots here</p>
            <div className="flex flex-col items-center">
              <AddBotsButton className="mt-4 w-full" buttonLabel="Install Bots" data={rules}></AddBotsButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex p-4 flex-wrap gap-4">
          <AutomationsTable data={catalogs}></AutomationsTable>
        </div>
      )}
    </>

    // <div>
    //   <header className="flex justify-between m-3">
    //     <div className=" flex place-self-center items-center">
    //       <FaGear className="mr-2 h-4 w-4" />
    //       <h1 className="scroll-m-20 text-xl font-semibold tracking-tight ">Automations</h1>
    //     </div>
    //     <div>
    //       <AddRule data={rules}></AddRule>
    //       <Button className="ml-5">
    //         <Play className="mr-2 h-4 w-4" /> <Link href="/alerts">Run report</Link>
    //       </Button>
    //     </div>
    //   </header>
    //   <Separator />
    //   <div className="container">
    //     <AutomationsTable data={catalogs}></AutomationsTable>
    //   </div>
    // </div>
  );
}

export default Automations;
