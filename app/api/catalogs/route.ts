import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import getServerSession from "next-auth";
// import getToken from "next-auth/jwt";
import authOptions from "@/auth.config";
import { auth } from "@/auth";

export async function GET(request: Request, response: Response) {
  const user = await currentUser();
  const session = await getServerSession(authOptions);

  console.log("SESSION", await session.auth());
  console.log("SESSION", await auth());
  //   console.log("TOKEN", await ge);
  // SearchParams
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);

  const filter: any = {};

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
  const user = await currentUser();
  console.log("USER ", user);

  try {
    const body = await request.json();

    const { tags, active, userId, ruleId } = body;

    const catalog = await db.catalog.create({
      data: { tags, active, userId, ruleId },
    });
    // }

    return Response.json(catalog);
  } catch (error) {
    console.log("[createInegration]", error);
    return new Response("Internal Error", { status: 500 });
  }
}
