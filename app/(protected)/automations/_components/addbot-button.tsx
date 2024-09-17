"use client";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addRuleToCatalog } from "@/data/catalogs";
import { cn } from "@/lib/utils";
import { Rule } from "@prisma/client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import BotCatalogTable from "./bot-catalog-table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { createBotAction } from "@/actions/bot";

type AddBotsButtonProps = {
  buttonLabel: string;
  data?: Rule[];
  className?: string;
};

function AddBotsButton({ buttonLabel = "Add", className = "" }: AddBotsButtonProps) {
  const router = useRouter();
  const [rule, setRule] = useState<Rule>();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

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

    const catalog = await createBotAction(rule?.id);
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
      <Button className={className} onClick={handleAddRule}>
        {buttonLabel}
      </Button>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="max-w-[80%]">
          <DialogHeader>
            <DialogTitle>Bots Catalog</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
              </form>
            </div>
          </DialogHeader>

          <BotCatalogTable search={search}></BotCatalogTable>

          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddBotsButton;
