type HeroControlsProps = {
  slideCount: number;
  selectedIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
};

export function HeroControls({
  slideCount,
  selectedIndex,
  onPrev,
  onNext,
  onDotClick,
}: HeroControlsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-boom-ink/82 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-boom-ink md:flex lg:left-6"
        aria-label="Propuesta anterior"
      >
        <ArrowLeftIcon />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-boom-ink/82 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-boom-ink md:flex lg:right-6"
        aria-label="Propuesta siguiente"
      >
        <ArrowRightIcon />
      </button>

      <div
        className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-boom-ink/88 px-4 py-3 shadow-xl backdrop-blur-md"
        role="tablist"
        aria-label="Propuestas del carrusel"
      >
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`Ir a la propuesta ${index + 1}`}
            onClick={() => onDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-9 bg-boom-lavender"
                : "w-2.5 bg-white/42 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
