import db from "@/lib/db";
import getUserCredentials from "../_utils/getUserCredencial";

export async function GET(request: Request, response: Response) {
  const user = await getUserCredentials(request);
  if (user === null) {
    return new Response("No credentials provided", { status: 401 });
  }

  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const filter: any = {};

  filter["userId"] = user.id;
  if (searchParams.get("intregrationTypeId")) {
    filter["intregrationTypeId"] = searchParams.get("intregrationTypeId");
  }

  console.log(filter);

  const catalogs = await db.catalog.findMany({
    where: filter,
  });

  return new Response(JSON.stringify(catalogs), { status: 200 });
}

export async function POST(request: Request) {
  const user = await getUserCredentials(request);
  if (user === null) {
    return new Response("No credentials provided", { status: 401 });
  }

  try {
    const body = await request.json();

    const { tags, active, ruleId } = body;

    const catalog = await db.catalog.create({
      // @ts-ignore
      data: { tags, active, userId: user.id, ruleId },
    });
    // }

    return Response.json(catalog);
  } catch (error) {
    console.log("[createInegration]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
