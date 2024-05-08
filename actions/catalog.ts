// "use server";

// import { currentUser } from "@/lib/auth";
// import { Catalog } from "@prisma/client";

// export const createCatalogAction = async (data: Catalog) => {
//   const user = await currentUser();

//   if (!user) {
//     return { error: "Unauthorized" };
//   }

//   const new: Catalog = {
//     userId: user.id,
//   };

//   return await createIntegration(newIntegration);
// };
