import { IntegrationCards } from "./_components/integration-cards";
// import { getIntegration } from "@/data/integration";
import { integrationTypeAction } from "@/actions/integrationsType";

async function Integrations() {
  const data = await integrationTypeAction();

  return (
    <div>
      <div className="flex content-center p-4 flex-wrap gap-4">
        <IntegrationCards data={data}></IntegrationCards>
      </div>
    </div>
  );
}

export default Integrations;
