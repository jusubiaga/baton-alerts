"use server";
import { RunLog } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

// TODO: Implement BD catalogs
export const getRunLog = async () => {
  const user = await currentUser();

  let runlog: RunLog[] = [];
  if (user) {
    runlog = await db.runLog.findMany({
      where: { userId: user.id },
      include: {
        rule: {
          include: {
            intregrationType: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return runlog;
};

export const createRun = async (data: Partial<RunLog>) => {
  const user = await currentUser();

  if (user) {
    const runlog = await db.runLog.create({
      data: {
        code: data.code ?? "",
        status: "RUNING",
        userId: user.id ?? "",
        ruleId: data.ruleId ?? "",
        errors: "",
      },
    });

    revalidatePath("/");
    return runlog;
  }

  return null;
};
