import { Separator } from "@/components/ui/separator";

async function Rules() {
  return (
    <div>
      <header className="flex justify-between m-3">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight place-self-center">Rules</h1>
        <div></div>
      </header>
      <Separator />
      <div className="container">
        <div>TBD - this is shown in admin mode</div>
      </div>
    </div>
  );
}

export default Rules;
