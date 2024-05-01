import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(request: Request) {
  const user = await currentUser();

  // SearchParams
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const filter: any = {};

  if (searchParams.get("intregrationTypeId")) {
    filter["intregrationTypeId"] = searchParams.get("intregrationTypeId");
  }

  console.log(filter);

  const rules = await db.rule.findMany({
    where: filter,
  });

  return new Response(JSON.stringify(rules), { status: 200 });
}

export async function POST(request: Request) {
  const user = await currentUser();
  console.log("USER ", user);

  try {
    const body = await request.json();

    const { name, intregrationTypeId } = body;

    // const create = createInegration({ userId, intregrationTypeId, clientId, apiKey });
    // const intregration = await prisma.intregration.findFirst({
    //   where: { userId, intregrationTypeId },
    // });

    // if (!intregration) {
    const createIntregration = await db.rule.create({
      data: { name, intregrationTypeId },
    });
    // }

    return Response.json(createIntregration);
  } catch (error) {
    console.log("[createInegration]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
