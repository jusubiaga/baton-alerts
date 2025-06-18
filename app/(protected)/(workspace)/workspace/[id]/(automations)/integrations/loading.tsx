import { CardSkeleton } from "./_components/CardSkeleton";

export function loading() {
  return (
    <div className="flex content-center p-4 flex-wrap gap-4">
      <CardSkeleton></CardSkeleton>
    </div>
  );
}
export default loading;
