import { Separator } from "@/components/ui/separator";
import { IntregationCards } from "./_components/integrationCards";
import { getIntegration } from "@/data/integration";

async function Integrations() {
  // const data = await getIntegrationType();
  // console.log(data);

  const data = await getIntegration();

  return (
    <div>
      <header className="flex justify-between m-3">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight place-self-center">Intagrations</h1>
      </header>
      <Separator />
      <div className="flex content-center justify-center p-4">
        <IntregationCards data={data}></IntregationCards>
      </div>
    </div>
  );
}

export default Integrations;
