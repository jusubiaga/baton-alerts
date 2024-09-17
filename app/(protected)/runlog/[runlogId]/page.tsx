import { getRunLogDetailAction } from "@/actions/runlog";
import RunLogDetailTable from "../_components/runlogdetail-table";

export default async function RunLogDetail({ params }) {
  const data = await getRunLogDetailAction(params.runlogId);

  return (
    <>
      <div className="flex p-4 flex-wrap gap-4">
        <RunLogDetailTable data={data}></RunLogDetailTable>
      </div>
    </>
  );
}
