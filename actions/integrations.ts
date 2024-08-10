"use server";

import { createIntegration, getIntegrationByType, updateIntegration } from "@/data/integration";
import { currentUser } from "@/lib/auth";
import { api } from "@/lib/globalApi";
import { Intregration } from "@prisma/client";

export const createInegrationAction = async (values: any) => {
  const user = await currentUser();
  console.log("USR:", user);

  console.log("VALUE:", values);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const newIntegration: Partial<Intregration> = {
    user: user.id,
    clientId: values.clientId,
    clientSecret: values.clientSecret,
    campaignPrefix: values.campaignPrefix,
    integrationType: values.intregrationTypeId,
  };

  return await api.post("/integration", newIntegration);

  //createIntegration(newIntegration);
};
