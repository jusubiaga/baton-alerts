"use server";

import { currentUser } from "@/lib/auth";
import { api } from "@/lib/globalApi";

export const createBotAction = async (workspace: string, rule: string) => {
  console.log("createBotAction ", workspace, rule);
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }
  const data = {
    user: user.id,
    workspace,
    rule,
  };
  const result = await api.post(`/bot`, data);

  console.log(result);
  return result;
};

export const deleteBotAction = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }
  const result = await api.delete(`/bot/${id}`);

  console.log(result);
  return result;
};

export const updateBotAction = async (id: string, data: any) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }
  const result = await api.patch(`/bot/${id}`, data);

  console.log(result);
  return result;
};

export const getBotAction = async () => {
  const user = await currentUser();
  console.log("USR:", user);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const result = await api.get(`/bot?user=${user.id}`);
  return result;
};

export const getBotByWorkspaceAction = async (workspace: string) => {
  const user = await currentUser();
  console.log("USR:", user);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const result = await api.get(`/bot?workspace=${workspace}`);
  return result;
};

export const runBotAction = async (id: string) => {
  const user = await currentUser();
  console.log("USR:", user);

  if (!user) {
    return { error: "Unauthorized" };
  }

  const result = await api.post(`/bot/run/${id}`, {});
  return result;
};
