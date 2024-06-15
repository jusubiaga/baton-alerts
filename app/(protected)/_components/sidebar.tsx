"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MenuSidebar from "./menu-sidebar";
import UserSidebar from "./user-sidebar";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <div className="flex gap-2 flex-col w-[280px] min-w-[280px] border-r min-h-screen">
      <div>
        <UserSidebar></UserSidebar>
      </div>
      <div className="grow">
        <MenuSidebar></MenuSidebar>
      </div>
      <div>Guide</div>
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
  );
}
