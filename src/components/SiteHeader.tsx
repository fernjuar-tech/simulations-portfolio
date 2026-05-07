"use client";

import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-background/70 border-b">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-3">
        <Link href="/" className="font-semibold tracking-tight">
          Maria Fernanda Juarez
        </Link>

        <span className="text-xs text-muted-foreground">
          Professional Portfolio
        </span>

        <div className="flex items-center gap-6 text-sm">
          <Link className="hover:text-foreground text-muted-foreground transition" href="/simulations">Simulations</Link>
          <Link className="hover:text-foreground text-muted-foreground transition" href="/data-projects">Data</Link>
          <Link className="hover:text-foreground text-muted-foreground transition" href="/tools">Tools</Link>
          <Link className="hover:text-foreground text-muted-foreground transition" href="/about">About</Link>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}