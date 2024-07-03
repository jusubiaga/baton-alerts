import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateCatalog } from "@/data/catalogs";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { create } from "domain";
import { createRun } from "@/data/runlog";

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  );
}

let FREQUENCY = [
  {
    id: 64,
    selected: false,
    label: "M",
  },
  {
    id: 32,
    selected: false,
    label: "T",
  },
  {
    id: 16,
    selected: false,
    label: "W",
  },
  {
    id: 8,
    selected: false,
    label: "T",
  },
  {
    id: 4,
    selected: false,
    label: "F",
  },
  {
    id: 2,
    selected: false,
    label: "S",
  },
  {
    id: 1,
    selected: false,
    label: "S",
  },
];
const formSchema = z.object({
  minNumber: z.coerce.number(),
  frequency: z.coerce.number(),
  hour: z.coerce.number(),
  min: z.coerce.number(),

  PMAM: z.enum(["PM", "AM"]),
});

type SheetDemoProps = {
  data: any;
  buttonLabel: string;
  className?: string;
  onSubmit?: (event: any) => void;
};

export function BotEditForm({ buttonLabel, className = "", data }: SheetDemoProps) {
  const router = useRouter();
  const [frequency, setFrequency] = useState(FREQUENCY);
  const [isCreateRun, SetIsCreateRun] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minNumber: data?.minimumNumber ?? 0,
      frequency: data?.frequency ?? 0,
      hour: data?.hour ?? 0,
      min: data?.min ?? 0,
      PMAM: data?.postMeridiem ? "PM" : "AM",
    },
  });

  useEffect(() => {
    // const frequencyBinary = Array.from(data?.frequency.toString(2)).reverse();

    // const newFrequency = frequency.map((item, index) => {
    //   return { ...item, selected: index < frequencyBinary.length ? !!frequencyBinary[index] : false };
    // });

    // setFrequency(newFrequency);

    const frequencyBinary = data?.frequency.toString(2).split("");
    const f = [...["0", "0", "0", "0", "0", "0", "0"], ...frequencyBinary].slice(frequencyBinary.length);

    console.log("useEffect: ", f);

    const ff = frequency.map((item, i) => {
      return f[i] === "1" ? { ...item, selected: true } : { ...item, selected: false };
    });
    console.log("Form", ff);

    setFrequency(ff);
  }, []);

  const handleSubmit = async (event: any) => {
    console.log("handleSubmit", event);
    console.log("handleSubmit", data);
    const d = {
      id: data.id,
      hour: event.hour,
      min: event.min,
      frequency: event.frequency,
      postMeridiem: event.PMAM === "PM" ? true : false,
      minimumNumber: event.minNumber,
    };
    const catalog = await updateCatalog(d);
    if (catalog) {
      toast.success("data.success");
    } else {
      toast.error("data.error");
    }
  };

  const handleRun = async (event: any) => {
    event.preventDefault();
    console.log("handleRun: ", data);
    SetIsCreateRun(true);
    const runlog = await createRun({
      code: data.ruleId + "-00000",
      ruleId: data.ruleId,
    });

    router.push("/runlog");
    SetIsCreateRun(false);
  };

  const handleChange = (event: any, newItem: any) => {
    // console.log("handleChange", event, newItem);
    // newItem = { ...newItem, selected: event };

    // const r = FREQUENCY.reduce((accumulator, item) => {
    //   const i = item.id === newItem.id ? newItem : item;
    //   return i.selected ? accumulator + i.id : accumulator;
    // }, 0);

    // // setFrequency()
    // form.setValue("frequency", r);
    // console.log("handleChange", r);

    let bn = 0;
    const f = frequency.map((item) => {
      const i = item.id === newItem.id ? { ...newItem, selected: event } : item;
      bn += i.selected ? i.id : 0;
      return i;
    });
    setFrequency(f);
    form.setValue("frequency", bn);
  };

  const handleFequency = (event: any) => {
    console.log("handleFequency", event);
  };

  const handleFrequencyChange = (event: any) => {
    console.log("handleFrequencyChange", event);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={className} variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
          {/* {buttonLabel} */}
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[625px]">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-2 font-semibold py-2">
              <Avatar>
                <AvatarImage src={data?.avatar} alt="@cald" />
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
                name="minNumber"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-left">Minimum Number of Headlines:</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} max={100} placeholder="" {...field} className="w-[20%]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <Label className="text-left">Frequency:</Label>
              <div className="grid grid-cols-5 items-center gap-4">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        {/* <FormLabel className="text-left">Hour</FormLabel> */}
                        <FormControl>
                          <Input type="number" placeholder="" {...field} className="" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row">
                    {frequency.map((item, i) => (
                      <>
                        <div className="flex items-center flex-col mr-4">
                          <Checkbox
                            id={i.toString()}
                            onCheckedChange={(e) => handleChange(e, item)}
                            checked={item.selected}
                          />
                          <label>{item.label}</label>
                        </div>
                      </>
                    ))}
                  </div>
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="hour"
                    render={({ field }) => (
                      <FormItem className="">
                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                          <SelectTrigger id="hour" aria-label="Hour">
                            <SelectValue placeholder="Hour" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i).map((item) => (
                              // eslint-disable-next-line react/jsx-key
                              <SelectItem value={item.toString()}>{item < 10 ? `0${item}` : item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="min"
                    render={({ field }) => (
                      <FormItem className="">
                        <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                          <SelectTrigger id="min" aria-label="Min">
                            <SelectValue placeholder="Min" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 60 }, (_, i) => i).map((item) => (
                              // eslint-disable-next-line react/jsx-key
                              <SelectItem value={item.toString()}>{item < 10 ? `0${item}` : item}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="PMAM"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-4">
                        {/* <FormLabel className="text-left">PM</FormLabel> */}
                        <FormControl>
                          {/* <Switch checked={field.value} onCheckedChange={field.onChange} /> */}
                          {/* <Input placeholder="Min" {...field} className="col-span-3" /> */}
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="PM" />
                              </FormControl>
                              <FormLabel className="font-normal">PM</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="AM" />
                              </FormControl>
                              <FormLabel className="font-normal">AM</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Separator />
            </div>

            <SheetFooter>
              {isCreateRun ? (
                <ButtonLoading></ButtonLoading>
              ) : (
                <Button type="submit" variant="secondary" onClick={handleRun}>
                  Run Now
                </Button>
              )}
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
