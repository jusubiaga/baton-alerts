import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { Intregration } from "@prisma/client";

export const getIntegration = async () => {
  const session = await auth(); // calling session

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

  let intregration = null;
  if (user) {
    intregration = await db.intregration.findFirst({ where: { userId: user.id, intregrationTypeId } });
  }

  return intregration;
};

export const createIntegration = async (data: Partial<Intregration>) => {
  const user = await currentUser();

  const integration = await getIntegrationByType(data?.intregrationTypeId ?? "");

  if (!integration) {
    return await db.intregration.create({
      data: {
        intregrationTypeId: data.intregrationTypeId ?? "",
        clientId: data.clientId ?? "",
        apiKey: data.apiKey ?? "",
        userId: user?.id ?? "",
      },
    });
  } else {
    return updateIntegration(integration?.id, data?.apiKey ?? "", data?.clientId ?? "");
  }
};

export const updateIntegration = async (id: string, apiKey: string, clientId: string) => {
  const integration = await db.intregration.update({
    where: { id },
    data: { apiKey, clientId },
  });

  return integration;
};
