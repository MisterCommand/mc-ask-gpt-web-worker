"use client"

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { ArrowLeft, Sun } from "lucide-react";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Sun className="h-4 w-4" />
          </Button>
          <SignOutButton>
            <Button variant="ghost" size="sm">
              Sign out
            </Button>
          </SignOutButton>
        </div>
      </div>
    </header>
  );
} 