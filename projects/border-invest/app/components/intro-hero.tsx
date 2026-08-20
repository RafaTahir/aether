import Image from "next/image";
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
          <figure className="intro-film">
            <Image
              className="intro-film-poster"
              src="/aether-intro-poster.png"
              alt="Aether product film poster showing capital with context"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <video
              className="intro-film-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src="/aether-intro.mp4" type="video/mp4" />
            </video>
            <div className="intro-film-scrim" aria-hidden="true" />
            <div className="intro-film-meta">
              <span>Aether / product film</span>
              <span>00:30</span>
            </div>
            <figcaption className="intro-film-caption">
              <span className="font-serif text-2xl">From brief to room.</span>
              <span className="mt-2 block text-xs uppercase tracking-[0.16em]">
                See how the context stays attached.
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
