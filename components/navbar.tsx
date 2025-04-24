"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { Search, Unplug } from "lucide-react";
import { TbReport } from "react-icons/tb";
import { FaListCheck, FaGear } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center p-4 rounded-xl  border-r min-w-screen lg:h-[60px] lg:px-6">
      {/* <div className="flex gap-x-2">
        <Button variant={pathname === "/automations" ? "default" : "ghost"}>
          <FaGear className="mr-2 h-4 w-4" />
          <Link href="/automations">Automations</Link>
        </Button>
        <Button variant={pathname === "/integrations" ? "default" : "ghost"}>
          <Unplug className="mr-2 h-4 w-4" /> <Link href="/integrations">Integrations</Link>
        </Button>
        <Button variant={pathname === "/alerts" ? "default" : "ghost"}>
          <TbReport className="mr-2 h-4 w-4" />
          <Link href="/alerts">Alerts</Link>
        </Button>
        <Button variant={pathname === "/rules" ? "default" : "ghost"}>
          <FaListCheck className="mr-2 h-4 w-4" />
          <Link href="/rules">Rules</Link>
        </Button>
      </div> */}
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Type to search inline..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      <UserButton />
    </nav>
  );
};
