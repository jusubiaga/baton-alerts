import { Separator } from "@/components/ui/separator";
import { getIntegrationType } from "@/app/_utils/globalApi";
import { IntregationCards } from "./_components/integrationCards";
import { getInegration } from "@/data/integration";

async function Intagrations() {
  // const data = await getIntegrationType();
  // console.log(data);

  const data = await getInegration();

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

export default Intagrations;
