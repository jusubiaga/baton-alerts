import { Separator } from "@/components/ui/separator";

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

function Intagrations() {
  return (
    <div>
      <header className="flex justify-between m-3">
        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight place-self-center">Intagrations</h1>
      </header>
      <Separator />
      <div className="flex content-center justify-center p-4">
        <CardDemo></CardDemo>
      </div>
    </div>
  );
}

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export function CardDemo({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[90%]", className)} {...props}>
      <CardHeader>
        <CardTitle>Add Plataform</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-green-500" />
          {/* <BellRing /> */}
          <Image src={`/Google.png`} alt="" width="64" height="64" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Google Ads</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch />
          <DialogDemo />
          {/* <ChevronRight /> */}
        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4 bg-muted">
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-gray-400" />
          {/* <BellRing /> */}
          <Image src={`/Facebook.png`} alt="" width="64" height="64" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Facebook</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch />
          <LockKeyhole />
        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4 bg-muted">
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-gray-400" />
          {/* <BellRing /> */}
          <Image src={`/Instagram.png`} alt="" width="64" height="64" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Instagram</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch />
          <LockKeyhole />
        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4 bg-muted">
          <span className="flex h-3 w-3 translate-y-1 rounded-full bg-gray-400" />
          {/* <BellRing /> */}
          <Image src={`/Tik Tok.png`} alt="" width="64" height="64" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Tik Toc</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch />
          <LockKeyhole />
        </div>

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
  );
}

export function DialogDemo() {
  return (
    <Dialog>
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
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Intagrations;
