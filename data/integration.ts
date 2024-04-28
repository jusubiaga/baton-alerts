import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";

export const getInegration = async () => {
  const user = await currentUser();
  console.log("Server Side Rendering ---");
  const session = await auth(); // calling session
  console.log(session); // console log to read session

  //   console.log("UUUSSSSEEEERRR: ", getServerSession());

  // const intregrationType = await db.intregrationType.findMany({
  //   // where: { userId: "clv4iruu90000dzavjsvcn4lb" },
  // });

  let intregration: Array<any> = [];
  if (session) {
    intregration = await db.intregrationType.findMany({
      include: {
        intregrations: {
          where: {
            userId: session?.user.id,
          },
        },
      },
    });
  }

  console.log("INT", intregration);

  return intregration;
};
