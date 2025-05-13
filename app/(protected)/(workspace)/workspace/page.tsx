"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Workspace {
  id?: number;
  name: string;
  description: string;
  icon: string;
  workspaceMembers: string;
  integrationsCount: number;
  botsCount: number;
}

const WorkspacePage = () => {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  const workspaceData: Workspace[] = [
    {
      id: 1,
      name: "Taxfix - Prod",
      description:
        "Taxfix Production Account, don't make changes without verifying with the Paid Acquisition team or Maestro's PM. Talk to Evgenii for access.",
      icon: "/images/taxfix.png",
      workspaceMembers: "jus@gmail.com",
      integrationsCount: 8,
      botsCount: 14,
    },
    {
      id: 2,
      name: "Taxfix - Sandbox",
      description: "Taxfix Sandbox Account, feel free to mess around. Integrations get deleted every week.",
      icon: "/images/taxfix.png",
      workspaceMembers: "jus@gmail.com",
      integrationsCount: 18,
      botsCount: 140,
    },
    {
      id: 3,
      name: "Steuerbot - Prod",
      description: "Steuerbot production workspace, talk to Marc L for access.",
      icon: "/images/steuerbot.png",
      workspaceMembers: "jus@gmail.com",
      integrationsCount: 8,
      botsCount: 14,
    },
    {
      id: 4,
      name: "TaxScouts - UK",
      description: "TS Prod, talk to Oli for access.",
      icon: "/images/taxscouts.png",
      workspaceMembers: "jus@gmail.com",
      integrationsCount: 8,
      botsCount: 14,
    },
    {
      id: 5,
      name: "Taxscouts - ES",
      description: "TS Prod Spain, talk to Miguel for access.",
      icon: "/images/taxscouts.png",
      workspaceMembers: "jus@gmail.com",
      integrationsCount: 8,
      botsCount: 14,
    },
  ];

  const handleNewWorkspaceClick = () => {
    setCurrentWorkspace({
      name: "",
      description: "",
      icon: "",
      workspaceMembers: "",
      integrationsCount: 0,
      botsCount: 0,
    });
    setIsDialogOpen(true);
  };

  const handleSetupClick = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    setIsDialogOpen(true);
  };

  const handleOpenClick = () => {
    router.push("/runlog");
  };

  const handleSaveWorkspace = () => {
    // TODO: Implement save logic (create new or update existing)
    console.log("Saving workspace:", currentWorkspace);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="flex flex-col items-center gap-2 mb-8 text-center">
        <h3 className="text-3xl font-semibold">Welcome, Lucas!</h3>
        <p className="text-sm text-muted-foreground">
          Create a new workspace or an existing one from the gallery below.
        </p>
        <Button onClick={handleNewWorkspaceClick} className="mt-4">
          New Workspace
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        {workspaceData.map((workspace) => (
          <Card key={workspace.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>WS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle className="text-lg">{workspace.name}</CardTitle>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="flex-grow py-4 text-sm text-muted-foreground">{workspace.description}</CardContent>
            <Separator />
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground">{workspace.integrationsCount} Integrations</p>
              <p className="text-sm text-muted-foreground">{workspace.botsCount} Bots configured</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => handleSetupClick(workspace)}>
                Setup
              </Button>
              <Button size="sm" onClick={handleOpenClick}>
                Open
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Workspace Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentWorkspace?.id ? `Edit Workspace: ${currentWorkspace.name}` : "Create New Workspace"}{" "}
              {/* Check for id to determine edit/create */}
            </DialogTitle>
            <DialogDescription>
              Make sure to capture essential details like who owns the workspace and the workspace purpose.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={currentWorkspace?.name || ""}
                onChange={(e) => {
                  if (currentWorkspace) {
                    setCurrentWorkspace({ ...currentWorkspace, name: e.target.value });
                  }
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={currentWorkspace?.description || ""}
                onChange={(e) => {
                  if (currentWorkspace) {
                    setCurrentWorkspace({ ...currentWorkspace, description: e.target.value });
                  }
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon (click to upload)
              </Label>
              {/* TODO: Implement icon upload */}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>WS</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="members" className="text-right">
                Workspace Members
              </Label>
              <Input
                id="members"
                value={currentWorkspace?.workspaceMembers || ""}
                onChange={(e) => {
                  if (currentWorkspace) {
                    setCurrentWorkspace({ ...currentWorkspace, workspaceMembers: e.target.value });
                  }
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveWorkspace}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspacePage;
