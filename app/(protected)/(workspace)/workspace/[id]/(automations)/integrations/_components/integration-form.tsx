"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  campaignPrefix: z.string(),
});

type IntegrationFormProps = {
  data: any;
  buttonLabel: string;
  className?: string;
  onSubmit: (event: any) => void;
};

export default function IntegrationForm({ buttonLabel, className = "", data, onSubmit }: IntegrationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: data?.clientId ?? "",
      clientSecret: data?.clientSecret ?? "",
      campaignPrefix: data?.campaignPrefix ?? "",
    },
  });

  const handleSubmit = (event: any) => {
    console.log("handleSubmit", event);

    const item = {
      ...data,
      ...event,
    };
    onSubmit(item);
  };

  const handleTest = (event: any) => {
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
      </SheetContent>
    </Sheet>
  );
}
