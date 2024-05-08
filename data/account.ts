import db from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};

export const getAccountByProviderId = async (providerAccountId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { providerAccountId },
    });

    return account;
  } catch {
    return null;
  }
};
