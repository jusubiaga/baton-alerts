import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import getUserCredentials from "../_utils/getUserCredencial";

export async function GET(request: Request) {
  const user = await getUserCredentials(request);
  if (user === null) {
    return new Response("No credentials provided", { status: 401 });
  }

  // SearchParams
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const filter: any = {};

  filter["userId"] = user.id;

  if (searchParams.get("intregrationTypeId")) {
    filter["intregrationTypeId"] = searchParams.get("intregrationTypeId");
  }

  const intregration = await db.intregration.findMany({
    where: filter,
  });

  return new Response(JSON.stringify(intregration), { status: 200 });
}

export async function POST(request: Request) {
  const user = await getUserCredentials(request);
  if (user === null) {
    return new Response("No credentials provided", { status: 401 });
  }

  try {
    const body = await request.json();

    const { intregrationTypeId, clientId, clientSecret, campaignPrefix } = body;

    const createIntregration = await db.intregration.create({
      data: { userId: user.id, intregrationTypeId, clientId, clientSecret, campaignPrefix },
    });

    return Response.json(createIntregration);
  } catch (error) {
    console.log("[createInegration]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
