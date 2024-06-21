const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const INTEGRATION_TYPE = [
  {
    id: "1",
    name: "Google Ads",
    description: "Manage campaign data from Google Universal App Campaigns, Search Campaigns, PMax, etc",
    status: "NOT_CONFIGURED",
    logo: "googleAds.png",
  },
  {
    id: "2",
    name: "Meta Ads",
    description: "Import performance data from Instagram and Facebook ads campaigns.",
    status: "NOT_CONFIGURED",
    logo: "metaAds.png",
  },
  {
    id: "3",
    name: "You Tube",
    description: "Upload and download and organize campaign assets, export reports, store large videos.",
    status: "NOT_CONFIGURED",
    logo: "youtubeAds.png",
  },
  {
    id: "4",
    name: "Reddit Ads",
    description: "Import performance data from Redit Ads",
    status: "NOT_CONFIGURED",
    logo: "redditAds.png",
  },
  {
    id: "5",
    name: "LinkedIn ads",
    description: "Import performance data from Linkedin Ads",
    status: "NOT_CONFIGURED",
    logo: "linkedInAds.png",
  },
  {
    id: "6",
    name: "Dropbox",
    description: "Upload and download assets from Dropbox.",
    status: "NOT_CONFIGURED",
    logo: "dropboxAds.png",
  },
];

const RULES = [
  {
    id: "FHC",
    name: "Facebook headlines count checker",
    description: "",
    available: false,
    avatar: "metaAds.png",
    intregrationTypeId: "2",
  },
  {
    id: "IHL",
    name: "Instagram hashtag length checker",
    description: "",
    available: false,
    avatar: "MetaAds.png",
    intregrationTypeId: "2",
  },
  {
    id: "GUH",
    name: "Google Universal Ads Campaign headlines count checker",
    description: "",
    available: true,
    avatar: "googleAds.png",
    intregrationTypeId: "1",
  },
  {
    id: "GUD",
    name: "Google Universal Ads Campaign descriptions count checker",
    description: "",
    available: true,
    avatar: "googleAds.png",
    intregrationTypeId: "1",
  },
  {
    id: "GUI",
    name: "Google Universal Ads Campaign image count checker",
    description: "",
    available: true,
    avatar: "googleAds.png",
    intregrationTypeId: "1",
  },
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

    // await db.IntregrationType.createMany({
    //   data: INTEGRATION_TYPE,
    // });
    await db.Rule.createMany({
      data: RULES,
    });
  } catch (error) {
    console.error("Error seeding default projec:", error);
  } finally {
    console.error("done!");
    await db.$disconnect();
  }
}

main();
