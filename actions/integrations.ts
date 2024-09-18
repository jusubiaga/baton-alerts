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
    // @ts-ignore
    user: user.id,
    clientId: values.clientId,
    clientSecret: values.clientSecret,
    campaignPrefix: values.campaignPrefix,
    integrationType: values.intregrationTypeId,
  };

  let rep: string;
  if (values.id) {
    rep = await api.patch(`/integration/${values.id}`, newIntegration);
  } else {
    rep = await api.post("/integration", newIntegration);
  }

  return rep;
  // try {
  //   const res = await api.post("/integration", newIntegration);
  //   return res;
  // } catch (error) {
  //   console.error(error);
  //   if (error?.response?.status === 409) {
  //     const res = await api.patch("/integration", newIntegration);
  //     return res;
  //   }
  // }

  //createIntegration(newIntegration);
};
