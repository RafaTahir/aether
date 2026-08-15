export default function Loading() {
  return (
    <main
      className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8"
      aria-busy="true"
      aria-label="Loading projects"
    >
      <div className="h-5 w-32 animate-pulse rounded bg-secondary" />
      <div className="mt-4 h-12 max-w-xl animate-pulse rounded bg-secondary" />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-lg bg-secondary"
          />
        ))}
      </div>
    </main>
  );
}
