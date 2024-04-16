"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CirclePlus, Megaphone, ChevronRight } from "lucide-react";

function companyPage() {
  return (
    <div className="w-[97%]">
      <header className="flex mb-4 justify-between items-center">
        <h1>Recent Company</h1>
        <div className="flex items-center">
          <Button variant={"outline"}>
            All Company <ChevronRight />
          </Button>
        </div>
      </header>

      <Separator />
      <div className="mt-4 flex gap-4">
        <Card className="w-[150px] h-[150px] cursor-pointer">
          <CardContent className="flex h-full w-full flex-col gap-y-5 items-center justify-center p-0 m-0">
            {/* <Button variant="ghost" size="icon"> */}
            <CirclePlus size={40} absoluteStrokeWidth />
            {/* </Button> */}
            <p>Create Company</p>
          </CardContent>
        </Card>
        <Card className="w-[150px] h-[150px]">
          <CardContent className="flex h-full w-full flex-col gap-y-5 items-center justify-center p-0 m-0">
            {/* <Button variant="ghost" size="icon"> */}
            <Megaphone size={40} absoluteStrokeWidth />
            {/* </Button> */}
            <p>New Company</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default companyPage;
