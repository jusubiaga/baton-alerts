import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import { MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { getRunLog } from "@/data/runlog";
import RunLogTable from "./_components/runLogTable";

const DATA = [
  {
    id: "cly697gl3000011j6x4a7k9fr",
    code: "CUV-0001",
    createdAt: "2024-07-03T19:51:47.127Z",
    userId: "clxkkg0rv0000808nz0mdyfei",
    ruleId: "CUV",
    status: "OK",
    errors: "",
    rule: {
      id: "CUV",
      name: "Google - Universal App Campaigns -  Video count checker",
      description: "This bot goes through applicable UAC Adgroups and makes sure every one of them has 20 videos.",
      available: true,
      avatar: "googleAds.png",
      intregrationTypeId: "1",
    },
  },
  {
    id: "cly69gwk9000111j64vndf1qm",
    code: "CUV-0002",
    createdAt: "2024-07-03T19:59:07.738Z",
    userId: "clxkkg0rv0000808nz0mdyfei",
    ruleId: "CUV",
    status: "NORUN",
    errors: "",
    rule: {
      id: "CUV",
      name: "Google - Universal App Campaigns -  Video count checker",
      description: "This bot goes through applicable UAC Adgroups and makes sure every one of them has 20 videos.",
      available: true,
      avatar: "googleAds.png",
      intregrationTypeId: "1",
    },
  },
];

async function RunLog() {
  const runLog = await getRunLog();
  console.log("RUN LOG", runLog);

  return (
    <>
      {runLog.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">No runs yet</h3>

            <p className="text-sm text-muted-foreground">You’ll start seeing run logs once you finish your setup.</p>
            <div className="flex flex-col items-center">
              <Button className="mt-4 w-full">
                <Link href="/integrations">Configure Integrations</Link>
              </Button>
              <Button className="mt-4 w-full">
                <Link href="/automations">Install Bots</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex p-4 flex-wrap gap-4">
          <RunLogTable data={runLog}></RunLogTable>
        </div>
      )}
    </>

    // <div>
    //   <header className="flex justify-between m-3">
    //     <div className=" flex place-self-center items-center">
    //       <TbReport className="mr-2 h-4 w-4" />
    //       <h1 className="scroll-m-20 text-xl font-semibold tracking-tight place-self-center">Alerts</h1>
    //     </div>
    //     <div></div>
    //   </header>
    //   <Separator />
    //   <div className="container">
    //     <div>TBD - This is a Mock. It is intended to show the execution of rules</div>
    //     {DATA.map((item) => (
    //       <>
    //         <Card className="m-3">
    //           <CardContent className="p-3 px-6">
    //             <div className="flex">
    //               <div className="w-[40%]">
    //                 <div className="font-bold">{item.id}</div>
    //                 <div className="text-xs">{item.stage}</div>
    //               </div>
    //               <div className="w-[40%]">
    //                 <div className="flex">
    //                   <span className="flex h-3 w-3 translate-y-1 rounded-full bg-gray-400 mr-2" />
    //                   <p>{item.status}</p>
    //                 </div>
    //                 <div className="text-xs">{item.executionAt}</div>
    //               </div>

    //               <div className="flex items-center mr-3 text-xs">{item.createdAt}</div>
    //               <div>
    //                 <Avatar>

    //                   <AvatarFallback className="bg-sky-500">
    //                     <FaUser className="text-white" />
    //                   </AvatarFallback>
    //                 </Avatar>
    //               </div>

    //               <div className="flex items-center ml-3">
    //                 <DropdownMenu>
    //                   <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                       <span className="sr-only">Open menu</span>
    //                       <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                   </DropdownMenuTrigger>
    //                   <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem>
    //                       <Pencil className="mr-2 h-4 w-4" />
    //                       <span>Rerun</span>
    //                     </DropdownMenuItem>
    //                   </DropdownMenuContent>
    //                 </DropdownMenu>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </>
    //     ))}
    //   </div>
    // </div>
  );
}

export default RunLog;
