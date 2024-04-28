import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";

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

  const user = await currentUser();

  console.log("USER ", user);

  const intregration = await prisma.intregration.findMany({
    // where: { userId: "clv4iruu90000dzavjsvcn4lb" },
  });

  return new Response(JSON.stringify(intregration), { status: 200 });
}
