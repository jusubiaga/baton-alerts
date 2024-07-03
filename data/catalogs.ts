"use server";
import { getIntegrationType } from "@/app/_utils/globalApi";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { Catalog } from "@prisma/client";
import { revalidatePath } from "next/cache";

// TODO: Implement BD catalogs
export const getCatalogs = async () => {
  const user = await currentUser();

  let catalogs: Catalog[] = [];
  if (user) {
    catalogs = await db.catalog.findMany({
      where: { userId: user.id },
      include: {
        rule: {
          include: {
            intregrationType: true,
          },
        },
      },
    });
  }

  return catalogs;
};

export const addRuleToCatalog = async (data: Partial<Catalog>) => {
  const user = await currentUser();

  if (user) {
    const rule = await db.catalog.findFirst({
      where: {
        userId: user.id,
        ruleId: data.ruleId,
      },
    });
    if (!rule) {
      const catalog = await db.catalog.create({
        data: {
          tags: data.tags ?? "",
          active: data.active ?? false,
          userId: user.id ?? "",
          ruleId: data.ruleId ?? "",
        },
      });

      revalidatePath("/");
      return catalog;
    }
  }

  return null;
};

export const updateCatalog = async (data: Partial<Catalog>) => {
  const user = await currentUser();

  if (user) {
    const catalog = await db.catalog.update({
      where: { id: data.id },
      data: data,
    });

    revalidatePath("/");
    return catalog;
  }

  return null;
};

export const deleteCatalogById = async (id: string) => {
  const user = await currentUser();

  if (user) {
    const catalog = await db.catalog.delete({
      where: { id, userId: user.id },
    });

    revalidatePath("/");
    return catalog;
  }

  return null;
};
