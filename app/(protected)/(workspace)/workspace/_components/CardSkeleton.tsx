import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CardSkeletonTemplate() {
  return (
    <Card className="rounded-lg p-4 shadow-lg w-[350px]">
      <CardHeader className="border-b p-0">
        <div className="flex items-center gap-2 font-semibold py-2">
          {/* Skeleton para el Avatar */}
          <Skeleton className="h-10 w-10 rounded-full" />
          {/* Skeleton para el título */}
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      <CardContent className="py-4 border-b">
        {/* Skeleton para la descripción */}
        <Skeleton className="h-3 w-full mt-2" />
        <Skeleton className="h-3 w-3/4 mt-2" />
      </CardContent>
      <CardFooter className="flex flex-col justify-end items-start pt-4 pb-0">
        {/* Skeleton para el estado */}
        <Skeleton className="h-3 w-20" />
        {/* Skeleton para el botón */}
        <Skeleton className="h-10 w-24 mt-4 self-end" />
      </CardFooter>
    </Card>
  );
}

export function CardSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex space-x-4">
          <CardSkeletonTemplate />
        </div>
      ))}
    </>
  );
}
