"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BellRing, Check, ChevronRight, Divide, EyeOff, LockKeyhole } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import Image from "next/image";
import { useEffect, useState } from "react";

export const useModal = (initialMode = false) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  useEffect(() => {
    console.log("useModal", modalOpen);
  }, [modalOpen]);
  const toggle = () => setModalOpen(!modalOpen);
  return [modalOpen, setModalOpen, toggle] as const;
};

type IntregationCardProps = {
  data: IntregationData[];
};

export function IntregationCards({ data }: IntregationCardProps) {
  //   const [modalOpen, setModalOpen, toggle] = useModal();
  const [isOpen, setIsOpen] = useState(false);

  //   const handleCreate = () => {
  //     console.log("IntregationCards");
  //     // setIsOpen(true);
  //     setModalOpen(true);
  //   };

  return (
    <>
      <Card className="w-[90%] " onClick={() => setIsOpen(true)}>
        <CardHeader>
          <CardTitle>Add Plataform</CardTitle>
          {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
        </CardHeader>
        <CardContent className="grid gap-4">
          {data.map((data) => (
            <div
              key={data.id}
              className="flex items-center space-x-4 rounded-md border p-4 hover:bg-gray-100 hover:cursor-pointer"
            >
              <span className="flex h-3 w-3 translate-y-1 rounded-full bg-gray-400" />
              <Image src={`/${data.logo}`} alt="" width="64" height="64" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{data.name}</p>
                {/* <p className="text-sm text-muted-foreground">Send notifications to device.</p> */}
              </div>
              {/* <Switch /> */}
              {data.enable ? <ChevronRight /> : <LockKeyhole />}
            </div>
          ))}

          {/* <div>
          {notifications.map((notification, index) => (
            <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
            </div>
          ))}
        </div> */}
        </CardContent>
        <CardFooter>
          {/* <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button> */}
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Configure Plataform</DialogTitle>
            {/* <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription> */}
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Client ID
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                API Key
              </Label>
              <Input id="username" className="col-span-3" />
              {/* <EyeOff /> */}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsOpen(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <ConfigDialog></ConfigDialog> */}
    </>
  );
}

type ConfigDialogProps = {
  isOpen: boolean;
  data: any;
};

export function ConfigDialog({ isOpen }: ConfigDialogProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  //   const [modalOpen, setModalOpen, toggle] = useModal(true);

  useEffect(() => {
    console.log("ConfigDialog", modalOpen);
  }, [modalOpen]);

  const handleOpenChange = () => {
    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <ChevronRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Configure Plataform</DialogTitle>
          {/* <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription> */}
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Client ID
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              API Key
            </Label>
            <Input id="username" className="col-span-3" />
            {/* <EyeOff /> */}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleOpenChange}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
