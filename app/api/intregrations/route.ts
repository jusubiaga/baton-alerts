import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(request: Request) {
  const user = await currentUser();

  // SearchParams
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const filter: any = {};

  if (searchParams.get("userId")) {
    filter["userId"] = searchParams.get("userId");
  }
  if (searchParams.get("intregrationTypeId")) {
    filter["intregrationTypeId"] = searchParams.get("intregrationTypeId");
  }

  console.log(filter);

  const intregration = await db.intregration.findMany({
    where: filter,
  });

  return new Response(JSON.stringify(intregration), { status: 200 });
}

export async function POST(request: Request) {
  const user = await currentUser();
  console.log("USER ", user);

  try {
    const body = await request.json();

    const { userId, intregrationTypeId, clientId, apiKey } = body;

    // const create = createInegration({ userId, intregrationTypeId, clientId, apiKey });
    // const intregration = await prisma.intregration.findFirst({
    //   where: { userId, intregrationTypeId },
    // });

    // if (!intregration) {
    const createIntregration = await db.intregration.create({
      data: { userId, intregrationTypeId, clientId, apiKey },
    });
    // }

    return Response.json(createIntregration);
  } catch (error) {
    console.log("[createInegration]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
