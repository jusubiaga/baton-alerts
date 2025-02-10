// components/TableSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="space-y-4 w-full m-4">
      {/* Simulación de la cabecera de la tabla */}
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-10 w-1/2" />

        <Skeleton className="h-10 w-1/4" />
      </div>

      {/* Simulación de las filas de la tabla */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-x-4">
          <Skeleton className="h-12 w-1/4" />
          <Skeleton className="h-12 w-1/2" />

          <Skeleton className="h-12 w-1/4" />
        </div>
      ))}
    </div>
  );
};
