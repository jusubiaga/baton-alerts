import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { Rule } from "@prisma/client";

// TODO: Implement BD catalogs
export const getRules = async () => {
  const user = await currentUser();

  let rules: Rule[] = [];
  if (user) {
    rules = await db.rule.findMany({
      include: {
        intregrationType: true,
      },
    });
  }

  return rules;
};
