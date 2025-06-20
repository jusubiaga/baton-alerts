"use server";

import { currentUser } from "@/lib/auth";
import { api } from "@/lib/globalApi";

export const getRunLogAction = async (workspace: string) => {
  const user = await currentUser();
  console.log("USR:", user);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const result = await api.get(`/runlog?workspace=${workspace}`);

  console.log(result);
  return result;
};

export const getRunLogDetailAction = async (id: string) => {
  const user = await currentUser();
  console.log("USR:", user);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const result = await api.get(`/runlog/${id}`);

  console.log(result);
  return result;
};
