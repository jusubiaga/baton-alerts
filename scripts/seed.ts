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
    name: "Google - Universal App Campaigns -  Headlines count checker",
    description: "This bot goes through applicable UAC Adgroups and makes sure every one of them has 5 headlines.",
    available: true,
    avatar: "googleAds.png",
    intregrationTypeId: "1",
  },
  {
    id: "GUD",
    name: "Google - Universal App Campaigns -  Description count checker",
    description: "This bot goes through applicable UAC Adgroups and makes sure every one of them has 5 descriptions.",
    available: true,
    avatar: "googleAds.png",
    intregrationTypeId: "1",
  },
  {
    id: "GUI",
    name: "Google - Universal App Campaigns -  Image count checker",
    description: "This bot goes through applicable UAC Adgroups and makes sure every one of them has 5 images.",
    available: true,
    avatar: "googleAds.png",
    intregrationTypeId: "1",
  },
  {
    id: "CUV",
    name: "Google - Universal App Campaigns -  Video count checker",
    description: "This bot goes through applicable UAC Adgroups and makes sure every one of them has 20 videos.",
    available: true,
    avatar: "googleAds.png",
    intregrationTypeId: "1",
  },
  {
    id: "GUS",
    name: "Google - Universal App Campaigns -  AdGroup Strenght checker",
    description: "This bot goes through applicable UAC Adgroups and makes sure their strength is not “Poor”",
    available: true,
    avatar: "googleAds.png",
    intregrationTypeId: "1",
  },
  {
    id: "GUP",
    name: "Google - Universal App Campaigns -  Asset Performance checker",
    description: "This bot goes through applicable UAC Assets and reports the ones with Low performance",
    available: true,
    avatar: "googleAds.png",
    intregrationTypeId: "1",
  },
  {
    id: "GUN",
    name: "Google - Universal App Campaigns - Campaign Naming Convention checker",
    description:
      "This bot goes through applicable UAC Campaigns and makes sure they comply with the naming convention pre-defined in the settings (regexp match)",
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

    await db.IntregrationType.createMany({
      data: INTEGRATION_TYPE,
    });
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
