"use server";

import { createIntegration, getIntegrationByType, updateIntegration } from "@/data/integration";
import { currentUser } from "@/lib/auth";
import { api } from "@/lib/globalApi";

export const integrationTypeAction = async () => {
  const user = await currentUser();
  // console.log("USR:", user);

  // console.log("VALUE:", values);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const result = await api.get(`/integration?user=${user.id}`);

  console.log(result);
  return result;

  // const newIntegration: Partial<Intregration> = {
  //   userId: user.id,
  //   clientId: values.clientId,
  //   clientSecret: values.clientSecret,
  //   campaignPrefix: values.campaignPrefix,
  //   intregrationTypeId: values.intregrationTypeId,
  // };

  // return await createIntegration(newIntegration);
};
