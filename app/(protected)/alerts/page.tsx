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
import { FaUser } from "react-icons/fa";

const DATA = [
  {
    id: "pj126tej6",
    stage: "Production",
    status: "Ready",
    statusCode: 3,
    executionAt: "1m 17s (1d ago)",
    createdAt: "1d ago by jusubiaga",
  },
  {
    id: "b146ted7",
    stage: "Production",
    status: "Error",
    statusCode: 2,
    executionAt: "17s",
    createdAt: "1d ago by jusubiaga",
  },
  {
    id: "c222tefr",
    stage: "Production",
    status: "Running",
    statusCode: 1,
    executionAt: "40s",
    createdAt: "1d ago by jusubiaga",
  },
];

async function Alerts() {
  // const user = useCurrentUser();
  return (
    <div>
      <header className="flex justify-between m-3">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight place-self-center">Alerts</h1>
        <div></div>
      </header>
      <Separator />
      <div className="container">
        <div>TBD - This is a Mock. It is intended to show the execution of rules</div>
        {DATA.map((item) => (
          <>
            <Card className="m-3">
              <CardContent className="p-3 px-6">
                <div className="flex">
                  <div className="w-[40%]">
                    <div className="font-bold">{item.id}</div>
                    <div className="text-xs">{item.stage}</div>
                  </div>
                  {/* <div className="w-1">
                    <span className="flex h-3 w-3 translate-y-1 rounded-full bg-gray-400 mr-2" />
                  </div> */}
                  <div className="w-[40%]">
                    <div className="flex">
                      <span className="flex h-3 w-3 translate-y-1 rounded-full bg-gray-400 mr-2" />
                      <p>{item.status}</p>
                    </div>
                    <div className="text-xs">{item.executionAt}</div>
                  </div>
                  {/* <div className="flex"> */}
                  <div className="flex items-center mr-3 text-xs">{item.createdAt}</div>
                  {/* <div></div> */}
                  {/* </div> */}
                  <div>
                    <Avatar>
                      {/* <AvatarImage src={user?.image || ""} /> */}
                      <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex items-center ml-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Rerun</span>
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem> */}
                        {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
