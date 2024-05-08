"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[100%] shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/automations" ? "default" : "outline"}>
          <Link href="/automations">Automations</Link>
        </Button>
        <Button asChild variant={pathname === "/integrations" ? "default" : "outline"}>
          <Link href="/integrations">Integrations</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        {/* <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
          <Link href="/settings">Settings</Link>
        </Button> */}
        {/* <Button asChild variant={pathname === "/company" ? "default" : "outline"}>
          <Link href="/company">Company</Link>
        </Button> */}
      </div>
      <UserButton />
    </nav>
  );
};
