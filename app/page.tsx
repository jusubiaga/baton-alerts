import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Redirect = ({ href }: { href: string }) => {
  redirect(href);
  return null;
};

export default async function Home() {
  const session = await auth();
  if (session) {
    // Redirect logged in users to the app
    return <Redirect href="/runlog" />;
  }
  // Redirect unauthenticated users to login
  return <Redirect href="/auth/login" />;
}
