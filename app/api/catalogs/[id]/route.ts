import db from "@/lib/db";
import getUserCredentials from "../../_utils/getUserCredencial";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await getUserCredentials(request);
  if (user === null) {
    return new Response("No credentials provided", { status: 401 });
  }

  const catalog = await db.catalog.findFirst({
    where: { id: params.id },
  });

  return Response.json(catalog);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const user = await getUserCredentials(request);
  if (user === null) {
    return new Response("No credentials provided", { status: 401 });
  }

  const catalog = await db.catalog.delete({
    where: { id: params.id },
  });

  return Response.json(catalog);
}
