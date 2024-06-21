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
import { BellRing, Check, ChevronRight, Divide, EyeOff, Loader2, LockKeyhole } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import Image from "next/image";
import { ElementType, ReactNode, useEffect, useRef, useState } from "react";
import { z } from "zod";
import IntegrationForm from "./integrationForm";
import { createIntegration } from "@/data/integration";

import { useSession } from "next-auth/react";
import { createInegrationAction } from "@/actions/integrations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { IntregrationType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<any>(null);
  const [loadings, setLoadings] = useState(false);

  const router = useRouter();

  const handleOnSubmit = async (event) => {
    console.log("handleOnSubmit", event);
    const createInegrationData = {
      intregrationTypeId: event.id,
      clientId: event.clientId,
      clientSecret: event.clientSecret,
      campaignPrefix: event.campaignPrefix,
    };
    setLoadings(true);
    const int = await createInegrationAction(createInegrationData);

    console.log("int: ", int);

    router.refresh();
    setLoadings(false);
    toast.success("data.success");
  };

  const populateCards = (data: any) => {
    return (
      <>
        {data.map((item) => (
          <Card key={item.id} className="rounded-lg p-4 shadow-lg w-[350px]">
            <CardHeader className="border-b p-0">
              <div className="flex items-center gap-2 font-semibold py-2">
                <Avatar>
                  <AvatarImage src={item.logo} alt="@cald" />
                  <AvatarFallback>I</AvatarFallback>
                </Avatar>
                <h4 className="">{item.name}</h4>
              </div>
            </CardHeader>
            <CardContent className="py-4 border-b">
              <p className="text-sm">{item.description}</p>
            </CardContent>

            <CardFooter className="flex  flex-col justify-end items-start pt-4 pb-0">
              <p className="text-sm text-muted-foreground">
                Status: {!!item?.intregrations?.id ? "Configured" : "Not configured"}
              </p>

              <SheetDemo
                className="mt-4 self-end"
                buttonLabel="Manage"
                data={item}
                onSubmit={handleOnSubmit}
              ></SheetDemo>
            </CardFooter>
          </Card>
        ))}
      </>
    );
  };

  return (
    <>
      {!loadings ? populateCards(data) : <div>Spinner</div>}
      {/* {data.map((item) => (
        <>
          <Card key={item.id} className="rounded-lg p-4 shadow-lg w-[350px]">
            <CardHeader className="border-b p-0">
              <div className="flex items-center gap-2 font-semibold py-2">
                <Avatar>
                  <AvatarImage src={item.logo} alt="@cald" />
                  <AvatarFallback>I</AvatarFallback>
                </Avatar>
                <h4 className="">{item.name}</h4>
              </div>
            </CardHeader>
            <CardContent className="py-4 border-b">
              <p className="text-sm">{item.description}</p>
            </CardContent>

            <CardFooter className="flex  flex-col justify-end items-start pt-4 pb-0">
              <p className="text-sm text-muted-foreground">Status: {item.status}</p>

              <SheetDemo
                className="mt-4 self-end"
                buttonLabel="Manage"
                data={item}
                onSubmit={handleOnSubmit}
              ></SheetDemo>
            </CardFooter>
          </Card>
        </>
      ))} */}
    </>
  );
}

const formSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  campaignPrefix: z.string(),
});

type SheetDemoProps = {
  data: any;
  buttonLabel: string;
  className?: string;
  onSubmit: (event: any) => void;
};

function SheetDemo({ buttonLabel, className = "", data, onSubmit }: SheetDemoProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: data?.intregrations?.clientId ?? "",
      clientSecret: data?.intregrations?.clientSecret ?? "",
      campaignPrefix: data?.intregrations?.campaignPrefix ?? "",
    },
  });

  const handleSubmit = (event) => {
    console.log("handleSubmit", event);

    const item = {
      ...data,
      ...event,
    };
    onSubmit(item);
  };

  const handleTest = (event) => {
    event.preventDefault();
    console.log("handleTest");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={className}>{buttonLabel}</Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[625px]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-2 font-semibold py-2">
              <Avatar>
                <AvatarImage src={data?.logo} alt="@cald" />
                <AvatarFallback>I</AvatarFallback>
              </Avatar>
              <h4 className="">{data?.name}</h4>
            </div>
          </SheetTitle>
          <SheetDescription>{data?.description}</SheetDescription>
          <Separator />
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Client ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Client ID" {...field} className="col-span-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="clientSecret"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Client Secret</FormLabel>
                    <FormControl>
                      <Input placeholder="Client Secret" {...field} className="col-span-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="campaignPrefix"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-left">Campaign Prefix</FormLabel>
                    <FormControl>
                      <Input placeholder="Campaign Prefix" {...field} className="col-span-3" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
            </div>

            <SheetFooter>
              <Button variant="secondary" onClick={handleTest}>
                Test Connection
              </Button>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>

        {/* <form id="formRef" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientId" className="text-left">
                Client ID
              </Label>
              <Input id="clientId" className="col-span-3" {... value: "dsdsds" } />
            </div>
            <Separator />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clientSecret" className="text-left">
                Client Secret
              </Label>
              <Input id="clientSecret" className="col-span-3" />
            </div>
            <Separator />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaignPrefix" className="text-left">
                Campaign Prefix
              </Label>
              <Input id="campaignPrefix" className="col-span-3" />
            </div>
            <Separator />
          </div>


          <SheetFooter>
            <Button variant="secondary" onClick={handleTest}>
              Test Connection
            </Button>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
        <div>{JSON.stringify(data)}</div> */}
      </SheetContent>
    </Sheet>
  );
}
