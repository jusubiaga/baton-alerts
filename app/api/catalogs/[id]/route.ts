import db from "@/lib/db";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const catalog = await db.catalog.findFirst({
    where: { id: params.id },
  });

  return Response.json(catalog);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const catalog = await db.catalog.delete({
    where: { id: params.id },
  });

  return Response.json(catalog);
}
