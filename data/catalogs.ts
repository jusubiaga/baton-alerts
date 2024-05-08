"use server";
import { getIntegrationType } from "@/app/_utils/globalApi";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { Catalog } from "@prisma/client";

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

export const addRuleToCatalog = async (data: Catalog) => {
  const user = await currentUser();

  let catalog: Catalog | null = null;
  if (user) {
    catalog = await db.catalog.create({
      data: {
        tags: data.tags,
        active: data.active,
        userId: user.id,
        ruleId: data.ruleId,
      },
    });
  }

  return catalog;
};
