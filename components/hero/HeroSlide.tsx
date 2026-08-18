import Image from "next/image";
import Link from "next/link";
import type { HeroSlide as HeroSlideType } from "@/lib/site-config";

type HeroSlideProps = {
  slide: HeroSlideType;
  priority?: boolean;
};

export function HeroSlide({ slide, priority = false }: HeroSlideProps) {
  const alignRight = slide.contentAlign === "right";

  return (
    <article className="relative min-h-[620px] w-full flex-[0_0_100%] overflow-hidden sm:min-h-[650px] lg:min-h-[680px]">
      <Image
        src={slide.image}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />

      <div className="paper-noise absolute inset-0 opacity-25" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1440px] items-end px-4 pb-20 pt-28 sm:min-h-[650px] sm:px-6 md:items-center md:pb-16 md:pt-28 lg:min-h-[680px] lg:px-10">
        <div
          className={`relative w-full max-w-[550px] overflow-hidden rounded-[1.6rem] border border-white/15 bg-boom-ink/[0.91] p-6 text-white shadow-[0_24px_70px_rgba(26,27,58,0.3)] backdrop-blur-md sm:p-8 ${
            alignRight ? "md:ml-auto" : ""
          }`}
        >
          <div
            className="absolute -right-16 -top-16 h-40 w-40 rounded-full border-[24px] border-boom-lavender/12"
            aria-hidden="true"
          />
          <div className="relative animate-[hero-reveal_600ms_ease-out_both]">
            <span className="inline-flex rounded-full bg-boom-lavender px-3.5 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-boom-ink">
              {slide.badge}
            </span>

            <h1 className="mt-4 max-w-xl font-display text-[clamp(2.5rem,5vw,4.45rem)] font-bold leading-[0.93] tracking-[-0.045em] text-balance">
              {slide.title}
            </h1>

            <p className="mt-4 max-w-lg text-[0.95rem] font-medium leading-6 text-white/76 sm:text-base sm:leading-7">
              {slide.subtitle}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              {slide.ctas.map((cta) => {
                const className =
                  cta.variant === "primary"
                    ? "button-lavender w-full sm:w-auto"
                    : "button-outline-light w-full sm:w-auto";

                if (cta.href.startsWith("http")) {
                  return (
                    <a
                      key={cta.label}
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {cta.label}
                    </a>
                  );
                }

                return (
                  <Link key={cta.label} href={cta.href} className={className}>
                    {cta.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
