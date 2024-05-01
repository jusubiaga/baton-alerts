"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  clientID: z.string().min(2).max(50),
  apiKey: z.string().min(2).max(50),
});

type IntegrationFormProps = {
  clientID: string;
  apiKey: string;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};
export default function IntegrationForm({ clientID, apiKey, onSubmit }: IntegrationFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientID: clientID ?? "",
      apiKey: apiKey ?? "",
    },
  });

  // 2. Define a submit handler.
  //   function onSubmit(values: z.infer<typeof formSchema>) {
  //     // Do something with the form values.
  //     // ✅ This will be type-safe and validated.
  //     console.log(values);
  //   }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="clientID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client ID</FormLabel>
              <FormControl>
                <Input placeholder="Client ID" {...field} />
              </FormControl>
              <FormDescription>Public identifier for an application</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <Input placeholder="API Key" {...field} />
              </FormControl>
              <FormDescription>Secret Key </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
