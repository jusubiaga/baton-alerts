import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export async function GET(request: Request) {
  const user = await currentUser();

  console.log("USR: ", user);

  // // SearchParams
  // const url = new URL(request.url);
  // const searchParams = new URLSearchParams(url.searchParams);

  // const filter: any = {};

  // if (searchParams.get("userId")) {
  //   filter["userId"] = searchParams.get("userId");
  // }
  // if (searchParams.get("intregrationTypeId")) {
  //   filter["intregrationTypeId"] = searchParams.get("intregrationTypeId");
  // }

  // console.log(filter);

  const intregrationsType = await db.intregrationType.findMany();

  return new Response(JSON.stringify(intregrationsType), { status: 200 });
}
