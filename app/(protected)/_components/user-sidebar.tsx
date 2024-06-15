import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Package2 } from "lucide-react";
import Link from "next/link";

export default function UserSidebar() {
  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Avatar>
          <AvatarImage src="/avatar.png" alt="@cald" />
          <AvatarFallback>CL</AvatarFallback>
        </Avatar>

        <span className="">Cald Inc</span>
      </Link>
      <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
        <Bell className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </div>
    // <div className="h-[60px] flex flex-row items-center justify-between p-4">
    //   <Avatar>
    //     <AvatarImage src="/avatar.png" alt="@cald" />
    //     <AvatarFallback>CL</AvatarFallback>
    //   </Avatar>
    //   <Button variant="outline" size="icon">
    //     <Bell className="w-4 h-4" />
    //   </Button>
    // </div>
  );
}
