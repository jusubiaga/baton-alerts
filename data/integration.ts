import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { Intregration } from "@prisma/client";

export const getIntegration = async () => {
  const session = await auth(); // calling session

  let intregration: Array<any> = [];
  if (session) {
    intregration = await db.intregrationType.findMany({
      orderBy: [{ id: "asc" }],
      include: {
        intregrations: {
          where: {
            userId: session?.user.id,
          },
        },
      },
    });
  }

  const data = intregration.map((item) => {
    return { ...item, intregrations: item?.intregrations.length > 0 ? { ...item.intregrations[0] } : {} };
  });

  console.log("INT", data);

  return data;
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
      // @ts-ignore
      data: {
        intregrationTypeId: data.intregrationTypeId ?? "",
        clientId: data.clientId ?? "",
        clientSecret: data.clientSecret ?? "",
        campaignPrefix: data.campaignPrefix ?? "",
        userId: user?.id ?? "",
      },
    });
  } else {
    return updateIntegration(
      integration?.id,
      data?.clientSecret ?? "",
      data?.clientId ?? "",
      data?.campaignPrefix ?? ""
    );
  }
};

export const updateIntegration = async (id: string, clientSecret: string, clientId: string, campaignPrefix: string) => {
  const integration = await db.intregration.update({
    where: { id },
    data: { clientSecret, clientId, campaignPrefix },
  });

  return integration;
};
