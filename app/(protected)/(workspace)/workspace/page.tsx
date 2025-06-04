"use client";

import React, { use, useEffect } from "react";
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
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "next-auth";

import {
  createWorkspaceAction,
  deleteWorkspaceAction,
  getWorkspaceAction,
  updateWorkspaceAction,
} from "@/actions/workspace";
import { fi } from "date-fns/locale";
import { toast } from "sonner";
import { CardSkeleton } from "./_components/CardSkeleton";
import { Workspace } from "./_models/models";

// interface Workspace {
//   id?: string;
//   name: string;
//   description: string;
//   icon: string;
//   user: string;
//   workspaceMembers: string;
//   integrationsCount: number;
//   botsCount: number;
// }

const WorkspacePage = () => {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useCurrentUser();

  const getWorkSpaces = async () => {
    console.log("getWorkSpaces called"); // Log para ver si se llama
    setIsLoading(true);
    const workspaces = await getWorkspaceAction();
    setWorkspaces(workspaces);
    setIsLoading(false);
    console.log("Workspaces fetched:", workspaces); // Log para ver los datos iniciales
  };

  useEffect(() => {
    getWorkSpaces();
  }, []);

  const handleNewWorkspaceClick = () => {
    setCurrentWorkspace({
      name: "",
      description: "",
      icon: "",
      user: user?.id ?? "",
      workspaceMembers: user?.email ?? "",
      integrationsCount: 0,
      botsCount: 0,
    });
    setIsDialogOpen(true);
  };

  const handleSetupClick = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
    setIsDialogOpen(true);
  };

  const handleOpenClick = (workspace: Workspace) => {
    router.push(`/workspace/${workspace?.id}/runlog`);
  };

  const handleSaveWorkspace = async () => {
    console.log("Saving workspace:", currentWorkspace);
    setIsDialogOpen(false);

    try {
      setIsLoading(true);
      await createWorkspaceAction(currentWorkspace);

      console.log("createWorkspaceAction successful");
      await getWorkSpaces();

      console.log("router.refresh() called after save");
      toast.success("Workspace created successfully!");
    } catch (error) {
      console.error("Error creating workspace:", error);
      toast.error("Failed to create workspace.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateWorkspace = async () => {
    if (currentWorkspace?.id) {
      console.log("Updating workspace:", currentWorkspace);
      setIsDialogOpen(false);

      try {
        setIsLoading(true);
        await updateWorkspaceAction(currentWorkspace?.id, currentWorkspace);

        console.log("updateWorkspaceAction successful"); // Log de éxito
        await getWorkSpaces();
        console.log("router.refresh() called after update");
        toast.success("Workspace updated successfully!");
      } catch (error) {
        console.error("Error updating workspace:", error);
        toast.error("Failed to update workspace.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Manejar el caso en que no hay ID para actualizar (aunque el botón debería estar deshabilitado/oculto en este caso)
      console.warn("Attempted to update workspace without an ID.");
      // toast.warning("Cannot update workspace without an ID.");
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (id) {
      try {
        setIsLoading(true);
        await deleteWorkspaceAction(id);
        await getWorkSpaces();
        toast.success("Workspace deleted successfully!");
      } catch (error) {
        console.error("Error deleting workspace:", error);
        toast.error("Failed to delete workspace.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="flex flex-col items-center gap-2 mb-8 text-center">
        <h3 className="text-3xl font-semibold">Welcome, {user?.name}</h3>
        <p className="text-sm text-muted-foreground">
          {workspaces.length === 0
            ? "Let’s create your first workspace"
            : "Create a new workspace or an existing one from the gallery below."}
        </p>
        <Button onClick={handleNewWorkspaceClick} className="mt-4">
          New Workspace
        </Button>
      </div>

      {isLoading ? (
        <div className="flex gap-2 flex-wrap items-center justify-center">
          <CardSkeleton></CardSkeleton>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
          {workspaces.map((workspace) => (
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
              <CardContent className="flex-grow py-4 text-sm text-muted-foreground">
                {workspace.description}
              </CardContent>
              <Separator />
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground">{workspace.integrationsCount} Integrations</p>
                <p className="text-xs text-muted-foreground">{workspace.botsCount} Bots configured</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2">
                {/* {user?.id === workspace.user && (
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(workspace?.id ?? "")}>
                    Delete
                  </Button>
                )}
 */}
                <Button variant="outline" size="sm" onClick={() => handleSetupClick(workspace)}>
                  Setup
                </Button>
                <Button size="sm" onClick={() => handleOpenClick(workspace)}>
                  Open
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Workspace Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentWorkspace?.id ? `Edit Workspace: ${currentWorkspace.name}` : "Create New Workspace"}
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
                    setCurrentWorkspace({ ...currentWorkspace, workspaceMembers: e?.target?.value });
                  }
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {currentWorkspace?.id ? (
              <Button type="submit" onClick={handleUpdateWorkspace}>
                Update changes
              </Button>
            ) : (
              <Button type="submit" onClick={handleSaveWorkspace}>
                Save changes
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspacePage;
