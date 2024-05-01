import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { Intregration } from "@prisma/client";

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

export const getIntegrationByType = async (intregrationTypeId: string) => {
  const user = await currentUser();
  console.log("Server Side Rendering ---");
  const session = await auth(); // calling session
  console.log(session); // console log to read session

  //   console.log("UUUSSSSEEEERRR: ", getServerSession());

  // const intregrationType = await db.intregrationType.findMany({
  //   // where: { userId: "clv4iruu90000dzavjsvcn4lb" },
  // });

  let intregration;
  if (session) {
    intregration = await db.intregration.findFirst({ where: { userId: session?.user.id, intregrationTypeId } });
  }

  console.log("INT BY TYPE", intregration);

  return intregration;
};

export const createInegration = async (data: Intregration) => {
  // const user = await currentUser();
  console.log("CREATE_INEGRATION");
  // const session = await auth(); // calling session
  // console.log(session); // console log to read session

  const createUser = await db.intregration.create({ data: data });
};
