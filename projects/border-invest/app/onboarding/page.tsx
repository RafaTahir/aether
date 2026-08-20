import Link from "next/link";
import { EligibilityFlow } from "../components/eligibility-flow";

const investorChecks = [
  [
    "Identity",
    "Verify the person behind a wallet without publishing personal information on-chain.",
  ],
  [
    "Jurisdiction",
    "Confirm that both the investor and project may participate in the specific funding model.",
  ],
  [
    "Terms and suitability",
    "Present risks, agreements, limits, and explicit consent before preparing a transaction.",
  ],
  [
    "Wallet screening",
    "Run sanctions and transaction-risk checks before accepting any commitment.",
  ],
];

const projectChecks = [
  [
    "Credible operator",
    "Identity, entity ownership, relevant experience, and local authority to execute the work.",
  ],
  [
    "Defined scope",
    "A bounded one-time project or a clearly measured period within a continuous program.",
  ],
  [
    "Evidence plan",
    "Documents or field evidence that an independent reviewer can use at every release milestone.",
  ],
  [
    "Legal funding model",
    "Grant, debt, revenue share, or equity terms approved for each issuer and investor market.",
  ],
];

export default function OnboardingPage() {
  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Readiness / before capital moves
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-3xl font-medium leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
            A wallet proves control. It does not prove eligibility.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground">
            Cross-border project funding can trigger securities, custody,
            payments, tax, sanctions, and consumer-protection rules. Those
            checks belong in the product architecture from day one.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <Checklist
            eyebrow="For participants"
            title="Investor readiness"
            checks={investorChecks}
          />
          <Checklist
            eyebrow="For operators"
            title="Project readiness"
            checks={projectChecks}
          />
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Try the flow
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium">
              A small step before a large one.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              This acknowledgement records what you intend to review. Legal
              eligibility requires approved identity and offering-rule
              providers.
            </p>
          </div>
          <div className="lg:col-span-8">
            <EligibilityFlow />
          </div>
        </div>
      </section>

      <section className="border-y bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-background/65">
              Current build state
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium">
              Interfaces, not shortcuts.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base leading-7 text-background/65">
              Eligibility providers, legal offering rules, custody, escrow, and
              USDC payments remain behind provider interfaces. This workspace
              cannot accept real commitments. A connected wallet is used only
              for Solana devnet testing.
            </p>
            <Link
              href="/projects/submit"
              className="mt-7 inline-flex min-h-11 items-center gap-4 border-b border-background text-sm font-semibold focus-visible:ring-2 focus-visible:ring-background"
            >
              Submit a project <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Checklist({
  eyebrow,
  title,
  checks,
}: {
  eyebrow: string;
  title: string;
  checks: string[][];
}) {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl font-medium">{title}</h2>
      <ol className="mt-8">
        {checks.map(([name, description], index) => (
          <li key={name} className="grid grid-cols-[2.5rem_1fr] border-t py-5">
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              0{index + 1}
            </span>
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
