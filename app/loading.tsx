export default function Loading() {
  return (
    <main className="min-h-screen bg-boom-lavender text-boom-ink">
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-xs text-center">
          <p className="font-display text-2xl font-extrabold uppercase tracking-[-0.03em]">
            Preparando tu próximo Boom
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-boom-ink/12">
            <div className="h-full w-1/2 animate-[loading-bar_1s_ease-in-out_infinite] bg-boom-ink" />
          </div>
        </div>
      </div>
    </main>
  );
}
