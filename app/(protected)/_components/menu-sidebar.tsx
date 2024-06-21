import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Icon } from "@radix-ui/react-select";
import {
  Activity,
  Archive,
  ArchiveX,
  Badge,
  BarChart3,
  Bot,
  Home,
  Inbox,
  LineChart,
  Package,
  Puzzle,
  Send,
  ShoppingCart,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    label: "Run Log",
    link: "/runlog",
    icon: <Activity className="h-4 w-4" />,
  },
  {
    label: "Bots",
    link: "/automations",
    icon: <Bot className="h-4 w-4" />,
  },
  {
    label: "Integrations",
    link: "/integrations",
    icon: <Puzzle className="h-4 w-4" />,
  },
  {
    label: "Metrics",
    link: "/",
    icon: <BarChart3 className="h-4 w-4" />,
  },
];

export default function MenuSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Run Log",
            label: "6",
            icon: Activity,
            variant: "default",
            href: "/runlog",
          },
          {
            title: "Bots",
            label: "",
            icon: Bot,
            variant: "ghost",
            href: "/automations",
          },
          {
            title: "Integrations",
            label: "",
            icon: Puzzle,
            variant: "ghost",
            href: "/integrations",
          },
          {
            title: "Metrics",
            label: "",
            icon: BarChart3,
            variant: "ghost",
            href: "/metrics",
          },
        ]}
      />
    </div>
    // <div className="">
    //   <Command>
    //     <CommandList className="">
    //       {menuItems.map((item: any, key: number) => (
    //         <>
    //           <CommandItem
    //             key={key}
    //             className="text-muted-foreground py-3 px-2"
    //             onSelect={(value) => console.log("Selected", value)}
    //           >
    //             <Link href={item.link}>
    //               <div className="flex flex-row gap-3 items-center justify-between px-2">
    //                 {item.icon}
    //                 {item.label}
    //               </div>
    //             </Link>
    //           </CommandItem>
    //         </>
    //       ))}
    //     </CommandList>
    //   </Command>
    // </div>
  );
}
