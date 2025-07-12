import { DashboardHeader } from "./docs-header";
import { Book } from "lucide-react";
import Link from "next/link";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
  <div className="min-h-screen bg-background">
        <DashboardHeader />
    <section className="py-16">
      <div className="container grid gap-12 md:grid-cols-12 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:order-none md:col-span-4 lg:col-span-3">
          <aside className="flex flex-col gap-2">
            <div className="border-border bg-card mb-6 overflow-hidden rounded-lg border shadow-sm">
              <div className="border-border bg-muted/50 border-b px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <Book className="text-muted-foreground mr-2.5 size-3.5" />
                  Documentation
                </h3>
              </div>
              <div className="p-5">
                <div className="text-foreground gap-4 text-lg font-semibold leading-snug">
                  <Link href="/docs/installation">Installation Guide</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="md:col-span-7 md:col-start-5 lg:col-start-6">
          {children}
        </div>
      </div>
    </section>
    </div>
  );
} 