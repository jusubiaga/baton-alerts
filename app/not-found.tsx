import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center">
      <h2>Not Found</h2>
      <p></p>
      <Button>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
