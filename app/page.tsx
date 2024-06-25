import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-black drop-shadow-md", font.className)}>[Landing page]</h1>
        <div>
          <LoginButton asChild>
            <Button variant="secondary" size="lg">
              Enter
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
