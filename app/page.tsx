import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { redirect } from "next/navigation";

const Redirect = ({ href }: { href: string }) => {
  redirect(href);
  return null;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";

export default async function Home() {
  const session = await auth();
  if (session) {
    // Redirect logged in users to the app
    return <Redirect href="/runlog" />;
  }
  // Not logged in: show landing page with call-to-action
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-black drop-shadow-md">Welcome to Baton Alerts</h1>
        <div className="space-y-4">
          <p className="text-lg text-gray-600">
            Your all-in-one platform for managing alerts and notifications
          </p>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="default">Get Started</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-black drop-shadow-md">[Landing page]</h1>
        <div>
          Welcome! You are logged in.
        </div>
      </div>
    </main>
  );
}
