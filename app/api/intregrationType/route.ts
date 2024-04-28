import { getInegration } from "@/data/integration";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";
// import getServerSession from "next-auth";
import getServerSession from "next-auth";
import authConfig from "@/auth.config";
import { useSession } from "next-auth/react";
import getToken from "next-auth/jwt";
import { auth, signOut } from "@/auth";

export async function GET(request: Request) {
  // const accessToken = request.headers.get("authorization");
  // if (!accessToken || !verifyJwt(accessToken)) {
  //   return new Response(
  //     JSON.stringify({
  //       error: "unauthorized",
  //     }),
  //     {
  //       status: 401,
  //     }
  //   );
  // }

  // const userId = await currentUser();

  // const intregrationType = await prisma.intregrationType.findMany({
  //   // where: { userId: "clv4iruu90000dzavjsvcn4lb" },
  // });

  // console.log("Server Side Rendering");
  // const session = await auth(); // calling session
  // console.log(session); // console log to read session

  const intregrationType = await getInegration();
  return new Response(JSON.stringify(intregrationType), { status: 200 });
}
