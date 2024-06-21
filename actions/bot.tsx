"use server";

import { createIntegration, getIntegrationByType, updateIntegration } from "@/data/integration";
import { getRules } from "@/data/rules";
import { currentUser } from "@/lib/auth";
import { Intregration } from "@prisma/client";

export const getBotAction = async () => {
  const user = await currentUser();
  console.log("USR:", user);

  if (!user) {
    return { error: "Unauthorized" };
  }

  return await getRules();
};
