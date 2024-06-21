import { Separator } from "@/components/ui/separator";
import { IntregationCards } from "./_components/integrationCards";
import { getIntegration } from "@/data/integration";
import { Divide, Unplug } from "lucide-react";

async function Integrations() {
  // const data = await getIntegrationType();
  // console.log(data);

  const data = await getIntegration();

  return (
    <div>
      {/* <header className="flex justify-between m-3">
        <div className=" flex place-self-center items-center">
          <Unplug className="mr-2 h-4 w-4" />
          <h1 className="scroll-m-20 text-xl font-semibold tracking-tight place-self-center">Intagrations</h1>
        </div>
      </header>
      <Separator /> */}
      <div className="flex content-center p-4 flex-wrap gap-4">
        <IntregationCards data={data}></IntregationCards>
      </div>
    </div>
  );
}

export default Integrations;
