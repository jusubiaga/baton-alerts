"use server";

import { currentUser } from "@/lib/auth";
import { api } from "@/lib/globalApi";
import { Description } from "@radix-ui/react-dialog";

export const getWorkspaceAction = async () => {
  const user = await currentUser();
  console.log("getRulesAction USR ---->:", user);

  if (!user) {
    return { error: "Unauthorized" };
  }

  //diseño1@empresa.com
  // ${user.id}
  const result = await api.get(`/workspace?user=${user.email}`);

  console.log(result);
  return result;
};

export const createWorkspaceAction = async (data: any) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  console.log("createWorkspaceAction", data);
  const postData = {
    name: data.name,
    description: data.description,
    icon: data.icon,
    user: user.id,
    workspaceMembers: [...data.workspaceMembers.split(",")],
  };
  const result = await api.post(`/workspace`, postData);

  console.log(result);
  return result;
};

export const updateWorkspaceAction = async (id: string, data: any) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  console.log("updateWorkspaceAction ", id, data);
  const result = await api.put(`/workspace/${id}`, data);
  console.log(result);
  return result;
};

export const deleteWorkspaceAction = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  console.log("deleteWorkspaceAction ", id);
  const result = await api.delete(`/workspace/${id}`);
  console.log(result);
  return result;
};
