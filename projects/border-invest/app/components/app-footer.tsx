import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 md:grid-cols-12 md:px-6 lg:px-8">
        <div className="md:col-span-6">
          <p className="font-serif text-3xl font-medium">Aether</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-background/65">
            A pilot workspace for transparent, compliant cross-border project
            capital on Solana.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-background/65">
              Explore
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href="/#opportunities">Projects</Link>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/about">About Aether</Link>
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/funding">Funding directory</Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-background/65">
              Build
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href="/onboarding">Project readiness</Link>
              <Link href="/projects/submit">Submit a project</Link>
              <Link href="/operator">Operator workspace</Link>
              <Link href="/funder">Funder workspace</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/20">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-5 text-xs text-background/60 md:px-6 lg:px-8">
          <p>
            Seeded catalog data. Devnet-only test flow. Not an investment
            offering.
          </p>
          <p>Built for transparent project finance.</p>
        </div>
      </div>
    </footer>
  );
}
