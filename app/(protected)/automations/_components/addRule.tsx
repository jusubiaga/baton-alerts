"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { addRuleToCatalog } from "@/data/catalogs";
import { cn } from "@/lib/utils";
import { Rule } from "@prisma/client";
import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AddRuleProps = {
  data: Rule[];
};

function AddRule({ data }: AddRuleProps) {
  const router = useRouter();
  const [rule, setRule] = useState<Rule>();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddRule = () => {
    setIsOpen(true);
  };
  const handleSelect = (rule: Rule) => {
    console.log("RULE: ", rule);
    setRule(rule);
  };

  const handleSubmit = async () => {
    const newCatalog = {
      tags: "",
      active: true,
      ruleId: rule?.id,
    };

    const catalog = await addRuleToCatalog(newCatalog);
    console.log("int: ", catalog);
    if (catalog) {
      toast.success("Data Success");
    } else {
      toast.success("Data Error");
    }

    // router.refresh();
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={handleAddRule}>
        <CirclePlus className="mr-2 h-4 w-4" />
        Add Rule
      </Button>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        {/* <DialogTrigger asChild>
        <Button variant="outline">
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Rule</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 w-full">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Rule
              </Label>
              <RuleList data={data} onSelect={handleSelect}></RuleList>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Add rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

type RuleListProps = {
  data: Rule[];
  onSelect: (rule: Rule) => void;
};

function RuleList({ data, onSelect }: RuleListProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSelect = (currentValue: Rule) => {
    setValue(currentValue.id === value ? "" : currentValue.id);
    setOpen(false);
    onSelect(currentValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? data.find((item) => item.id === value)?.name : "Select rule ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Rule..." />
          <CommandList>
            <CommandEmpty>No rules found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem key={item.id} value={item.id} onSelect={() => handleSelect(item)}>
                  <Check className={cn("mr-2 h-4 w-4", value === item.id ? "opacity-100" : "opacity-0")} />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default AddRule;
