import { useWorkspace } from "@/app/(protected)/(workspace)/workspace/[id]/(automations)/workspaceProvider";
import { Nav } from "@/components/nav";

import { Activity, BarChart3, Bot, Puzzle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MenuSidebar() {
  // const pathname = useNavigation();
  const workspaceId = useWorkspace().workspaceId;

  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Run Log",
            label: "",
            icon: Activity,
            variant: "default",
            href: `/workspace/${workspaceId}/runlog`,
          },
          {
            title: "Bots",
            label: "",
            icon: Bot,
            variant: "ghost",
            href: `/workspace/${workspaceId}/automations`,
          },
          {
            title: "Integrations",
            label: "",
            icon: Puzzle,
            variant: "ghost",
            href: `/workspace/${workspaceId}/integrations`,
          },
          {
            title: "Metrics",
            label: "",
            icon: BarChart3,
            variant: "ghost",
            href: `/workspace/${workspaceId}/metrics`,
          },
        ]}
      />
    </div>
  );
}
function useNavigation() {
  throw new Error("Function not implemented.");
}
