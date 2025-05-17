import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default async function Home() {
  const session = await auth();
  if (session) {
    // Redirect logged in users to the app
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
  // Redirect unauthenticated users to login
  redirect("/auth/login");
}
