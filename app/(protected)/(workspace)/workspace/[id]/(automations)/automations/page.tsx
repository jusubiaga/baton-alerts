import { getCatalogs } from "@/data/catalogs";
import AutomationsTable from "./_components/AutomationsTable";
import AddBotsButton from "./_components/addbot-button";
import { getRules } from "@/data/rules";
import { Rule } from "@prisma/client";
import { getBotByWorkspaceAction } from "@/actions/bot";
import { useWorkspace } from "../workspaceProvider";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface AutomationsPageProps {
  params: {
    id: string; // Esto es para el parámetro dinámico [id] en la ruta
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
async function Automations({ params }: AutomationsPageProps) {
  const bot = await getBotByWorkspaceAction(params.id);
  const rules: Rule[] = await getRules();

  return (
    <>
      {bot.length === 0 ? (
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
          <AutomationsTable data={bot}></AutomationsTable>
        </div>
      )}
    </>
  );
}

export default Automations;
