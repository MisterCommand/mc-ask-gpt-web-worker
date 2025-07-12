"use client"

import { ArrowLeft } from "lucide-react";
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
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground flex gap-1 items-center"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
} 