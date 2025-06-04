"use server";

import { currentUser } from "@/lib/auth";
import { api } from "@/lib/globalApi";

export const getRulesAction = async (workspace: string) => {
  const user = await currentUser();
  console.log("getRulesAction USR ---->:", user);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const result = await api.get(`/rules?workspace=${workspace}`);

  console.log(result);
  return result;
};
