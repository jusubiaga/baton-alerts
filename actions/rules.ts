"use server";

import { currentUser } from "@/lib/auth";
import { api } from "@/lib/globalApi";

export const getRulesAction = async () => {
  const user = await currentUser();
  console.log("USR:", user);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const result = await api.get(`/rules`);

  console.log(result);
  return result;
};
