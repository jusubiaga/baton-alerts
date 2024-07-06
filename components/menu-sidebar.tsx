import { Nav } from "@/components/nav";

import { Activity, BarChart3, Bot, Puzzle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
            label: "0",
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
  );
}
