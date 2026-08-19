import type { Metadata } from "next";
import Link from "next/link";
import { FunderWorkspace } from "../components/funder-workspace";
import { projects } from "@/src/data/projects";
import { loadFunderWorkspace } from "./data";

export const metadata: Metadata = {
  title: "Funder Workspace | Aether",
  description:
    "Review Aether project rooms as a corporate, foundation, or impact fund partner.",
};

export default async function FunderPage() {
  const workspace = await loadFunderWorkspace();

  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Funder workspace
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
            Build a project pipeline with a point of view.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            Review seeded project rooms by market, sector, funding model, risk,
            and milestone evidence. Shortlist the rooms worth a deeper
            partnership conversation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/funding"
              className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Find funding sources
            </Link>
            <Link
              href="/about#funders"
              className="inline-flex min-h-11 items-center border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Why funders use Aether
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <FunderWorkspace projects={projects} state={workspace} />
      </section>
      <section className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 text-xs leading-5 text-muted-foreground md:px-6 lg:px-8">
          <strong className="text-foreground">
            Funder workspace boundary.
          </strong>{" "}
          The catalog is seeded for the current pilot. It does not constitute an
          offer, recommendation, diligence conclusion, or commitment to fund.
        </div>
      </section>
    </main>
  );
}
