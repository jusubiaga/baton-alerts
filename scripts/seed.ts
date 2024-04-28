const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const INTEGRATION_TYPE = [
  { id: "1", name: "Google Ads", enable: true, logo: "Google.png" },
  { id: "2", name: "Facebook", logo: "Facebook.png" },
  { id: "3", name: "Instagram", logo: "Instagram.png" },
  { id: "4", name: "Tik Toc", logo: "Tik Tok.png" },
];

async function main() {
  try {
    // await db.project.createMany({
    //   data: [
    //     { name: "Project 1" },
    //     { name: "Project 2" },
    //     { name: "Project 3" },
    //     { name: "Project 4" },
    //     { name: "Project 5" },
    //   ],
    // });

    await db.IntregrationType.createMany({
      data: INTEGRATION_TYPE,
    });
  } catch (error) {
    console.error("Error seeding default projec:", error);
  } finally {
    console.error("done!");
    await db.$disconnect();
  }
}

main();
