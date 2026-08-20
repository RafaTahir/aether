import Link from "next/link";

export function IntroHero({ accountStorage }: { accountStorage: boolean }) {
  return (
    <section className="intro-hero border-b bg-brand-bg">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Aether / project capital
          </p>
          <h1 className="mt-7 max-w-3xl font-serif text-5xl font-medium leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Projects worth crossing borders for.
          </h1>
          <div className="mt-8 max-w-xl border-l-2 border-primary pl-5">
            <p className="font-serif text-2xl leading-tight text-primary md:text-3xl">
              Capital with context.
            </p>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground md:text-lg">
              Aether keeps the operator, the evidence, the capital lane, and the
              progress in one room before the next decision gets made.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#opportunities"
              className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore project rooms
            </Link>
            <Link
              href="/projects/submit"
              className="inline-flex min-h-11 items-center border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Build a room
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Operators</span>
            <span>Funders</span>
            <span>Evidence</span>
            <span>Progress</span>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            {accountStorage ? "Account workspace" : "Browser workspace"} /
            Solana devnet
          </p>
        </div>

        <div className="lg:col-span-6">
          <div
            className="intro-stage"
            role="img"
            aria-label="Aether connects operators, funders, participants, evidence, and progress around one project room"
          >
            <svg
              className="intro-stage-lines"
              viewBox="0 0 620 620"
              aria-hidden="true"
            >
              <g className="intro-orbit">
                <ellipse cx="310" cy="310" rx="220" ry="112" />
                <ellipse
                  cx="310"
                  cy="310"
                  rx="220"
                  ry="112"
                  transform="rotate(60 310 310)"
                />
                <ellipse
                  cx="310"
                  cy="310"
                  rx="220"
                  ry="112"
                  transform="rotate(-60 310 310)"
                />
              </g>
              <g className="intro-orbit intro-orbit-reverse">
                <circle cx="310" cy="310" r="166" />
                <circle cx="310" cy="310" r="248" />
              </g>
            </svg>
            <div className="intro-core">
              <span className="font-serif text-4xl leading-none">Aether</span>
              <span className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                Project room
              </span>
            </div>
            <span className="intro-node intro-node-operator">Operator</span>
            <span className="intro-node intro-node-funder">Funder</span>
            <span className="intro-node intro-node-evidence">Evidence</span>
            <span className="intro-node intro-node-progress">Progress</span>
            <span className="intro-node intro-node-participant">
              Participant
            </span>
            <p className="intro-stage-note">
              One shared surface.
              <br />
              Different reasons to trust it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
