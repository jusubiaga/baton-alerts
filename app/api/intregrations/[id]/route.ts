import db from "@/lib/db";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const intregration = await db.intregration.findFirst({
    where: { id: params.id },
  });

  return Response.json(intregration);
}

export async function PATCH(_request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await _request.json();

    const { clientId, clientSecret } = body;

    const createIntregration = await db.intregration.update({
      where: { id: params.id },
      data: { clientId, clientSecret },
    });

    return Response.json(createIntregration);
  } catch (error) {
    console.log("[createInegration]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
