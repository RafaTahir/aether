"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";
import { WalletButton } from "./wallet-button";
import { useCluster } from "./cluster-context";

type NavItem = { href: string; label: string };
type NavGroup = { label: string; items: NavItem[] };

const FLAT_LINKS: NavItem[] = [
  { href: "/#opportunities", label: "Projects" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
];

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Portfolio",
    items: [
      { href: "/portfolio", label: "My portfolio" },
      { href: "/funding", label: "Funding directory" },
    ],
  },
  {
    label: "Workspaces",
    items: [
      { href: "/operator", label: "Operator workspace" },
      { href: "/funder", label: "Funder workspace" },
    ],
  },
];

const MOBILE_GROUPS: NavGroup[] = [
  ...NAV_GROUPS,
  {
    label: "Get involved",
    items: [
      { href: "/onboarding", label: "Readiness review" },
      { href: "/projects/submit", label: "Submit a project" },
    ],
  },
];

export function AppHeader({ accountStorage }: { accountStorage: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const { cluster } = useCluster();
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMenuOpen(false);
      }
    }
    function closeOnClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnClickOutside);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/#opportunities"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="/"
            className="flex min-h-10 items-center gap-3 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className="gold-mark grid size-8 place-items-center bg-primary font-serif text-lg text-primary-foreground"
              aria-hidden="true"
            >
              A
            </span>
            <span className="text-sm font-bold tracking-tight">Aether</span>
          </Link>
          <nav
            ref={navRef}
            aria-label="Primary"
            className="hidden items-center gap-5 lg:flex"
          >
            {FLAT_LINKS.map((link) => (
              <Link
                key={link.href}
                className={`min-h-10 content-center border-b-2 text-sm focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive(link.href)
                    ? "border-primary font-semibold text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
            {NAV_GROUPS.map((group) => (
              <NavDropdown
                key={group.label}
                group={group}
                open={openGroup === group.label}
                active={group.items.some((item) => isActive(item.href))}
                onToggle={() =>
                  setOpenGroup((current) =>
                    current === group.label ? null : group.label
                  )
                }
                onNavigate={() => setOpenGroup(null)}
              />
            ))}
            <Link
              className={`inline-flex min-h-9 items-center px-4 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring ${
                isActive("/projects/submit")
                  ? "bg-primary text-primary-foreground"
                  : "border bg-card hover:bg-accent"
              }`}
              href="/projects/submit"
            >
              Submit a project
            </Link>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden min-h-10 items-center border px-3 text-xs font-medium text-muted-foreground xl:inline-flex">
            <span
              className="mr-2 size-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            {accountStorage ? "Account workspace" : "Browser workspace"} /
            Solana {cluster}
          </span>
          <span className="hidden sm:inline-flex">
            <ThemeToggle />
          </span>
          <WalletButton compact />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
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
            <MobileLink href="/how-it-works" onClick={() => setMenuOpen(false)}>
              How it works
            </MobileLink>
            <MobileLink href="/about" onClick={() => setMenuOpen(false)}>
              About
            </MobileLink>
            {MOBILE_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="mt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </MobileLink>
                ))}
              </div>
            ))}
            <div className="flex min-h-11 items-center justify-between border-b text-sm font-semibold sm:hidden">
              <span>Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function NavDropdown({
  group,
  open,
  active,
  onToggle,
  onNavigate,
}: {
  group: NavGroup;
  open: boolean;
  active: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="true"
        className={`inline-flex min-h-10 items-center gap-1.5 border-b-2 text-sm focus-visible:ring-2 focus-visible:ring-ring ${
          active
            ? "border-primary font-semibold text-foreground"
            : "border-transparent text-muted-foreground hover:text-foreground"
        }`}
      >
        {group.label}
        <span aria-hidden="true" className="text-xs">
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-56 border bg-card shadow-lg">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex min-h-11 items-center px-4 text-sm text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
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
