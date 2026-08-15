"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { WalletButton } from "./wallet-button";

export function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex min-h-10 items-center gap-3 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className="grid size-8 place-items-center bg-primary font-serif text-lg text-primary-foreground"
              aria-hidden="true"
            >
              A
            </span>
            <span className="text-sm font-bold tracking-tight">Aether</span>
          </Link>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 lg:flex"
          >
            <Link
              className="min-h-10 content-center text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              href="/#opportunities"
            >
              Projects
            </Link>
            <Link
              className="min-h-10 content-center text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              href="/#method"
            >
              Our method
            </Link>
            <Link
              className="min-h-10 content-center text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              href="/portfolio"
            >
              Portfolio
            </Link>
            <Link
              className="min-h-10 content-center text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              href="/projects/submit"
            >
              Submit a project
            </Link>
            <Link
              className="min-h-10 content-center text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              href="/operator"
            >
              Operator workspace
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden min-h-10 items-center border px-3 text-xs font-medium text-muted-foreground sm:inline-flex">
            <span
              className="mr-2 size-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            Devnet prototype
          </span>
          <ThemeToggle />
          <WalletButton />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex min-h-10 items-center border px-3 text-xs font-semibold lg:hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            Menu
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile primary"
          className="border-t px-4 py-3 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            <MobileLink
              href="/#opportunities"
              onClick={() => setMenuOpen(false)}
            >
              Projects
            </MobileLink>
            <MobileLink href="/portfolio" onClick={() => setMenuOpen(false)}>
              Portfolio
            </MobileLink>
            <MobileLink href="/onboarding" onClick={() => setMenuOpen(false)}>
              Demo eligibility
            </MobileLink>
            <MobileLink
              href="/projects/submit"
              onClick={() => setMenuOpen(false)}
            >
              Submit a project
            </MobileLink>
            <MobileLink href="/operator" onClick={() => setMenuOpen(false)}>
              Operator workspace
            </MobileLink>
          </div>
        </nav>
      )}
    </header>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex min-h-11 items-center border-b text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </Link>
  );
}
