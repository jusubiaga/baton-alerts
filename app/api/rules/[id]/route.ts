import db from "@/lib/db";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const rule = await db.rule.findFirst({
    where: { id: params.id },
  });

  return Response.json(rule);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const rule = await db.rule.delete({
    where: { id: params.id },
  });

  return Response.json(rule);
}
