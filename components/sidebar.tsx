"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MenuSidebar from "./menu-sidebar";
import HeaderSidebar from "./header-sidebar";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { useWorkspace } from "@/app/(protected)/(workspace)/workspace/[id]/(automations)/workspaceProvider";

export default function Sidebar() {
  const workspaceId = useWorkspace().workspaceId;
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex gap-2 flex-col w-[280px] min-w-[280px] border-r min-h-screen">
        <div>
          <HeaderSidebar></HeaderSidebar>
        </div>
        <div className="grow">
          <MenuSidebar></MenuSidebar>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <p className="text-sm font-semibold py-2">Setup Guide</p>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={true} />
            <label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Create account
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <a href={`/workspace/${workspaceId}/integrations`}>Configure integrations</a>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <a href={`/workspace/${workspaceId}/automations`}>Install a bot</a>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <a href={`/workspace/${workspaceId}/automations`}>Run a bot</a>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <a href={`/workspace/${workspaceId}/runlog`}>Check results in the run log</a>
            </label>
          </div>
        </div>
        <div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
