"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useWorkspace } from "@/app/(protected)/(workspace)/workspace/[id]/(automations)/workspaceProvider";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const workspaceId = useWorkspace().workspaceId;

  const pathNane = usePathname();
  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({ variant: link.href === pathNane ? "default" : "ghost", size: "icon" }),
                    "h-9 w-9",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    "font-size: 1rem"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && <span className="ml-auto text-muted-foreground">{link.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href={link.href}
              className={cn(
                buttonVariants({ variant: link.href === pathNane ? "default" : "ghost", size: "default" }),
                link.variant === "default" && "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start",
                "font-size: 14px"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <Avatar
                  className={cn(
                    "ml-auto",
                    "w-[30px] h-[30px]",
                    link.href === pathNane ? "text-background" : "bg-gray-700"
                  )}
                >
                  <AvatarFallback className={cn(link.href === pathNane ? "bg-gray-700" : "bg-gray-700 text-white")}>
                    {link.label}
                  </AvatarFallback>
                </Avatar>

                // <span className={cn("ml-auto", link.variant === "default" && "text-background dark:text-white")}>
                //   {link.label}
                // </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
