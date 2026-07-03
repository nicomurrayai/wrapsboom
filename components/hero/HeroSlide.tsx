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
    <article className="relative min-h-[740px] w-full flex-[0_0_100%] overflow-hidden">
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

      <div className="relative z-10 mx-auto flex min-h-[740px] max-w-[1440px] items-end px-4 pb-28 pt-32 sm:px-6 md:items-center md:pb-24 lg:px-10">
        <div
          className={`relative max-w-[620px] overflow-hidden rounded-[2rem] border border-white/15 bg-boom-ink/94 p-6 text-white shadow-[0_30px_90px_rgba(26,27,58,0.34)] backdrop-blur-sm sm:p-9 md:p-11 ${
            alignRight ? "md:ml-auto" : ""
          }`}
        >
          <div
            className="absolute -right-16 -top-16 h-40 w-40 rounded-full border-[24px] border-boom-lavender/12"
            aria-hidden="true"
          />
          <div className="relative animate-[hero-reveal_600ms_ease-out_both]">
            <span className="inline-flex rounded-full bg-boom-lavender px-4 py-2 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-boom-ink">
              {slide.badge}
            </span>

            <h1 className="mt-5 max-w-xl font-display text-[clamp(2.75rem,6vw,5.7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em] text-balance">
              {slide.title}
            </h1>

            <p className="mt-5 max-w-lg text-base font-medium leading-7 text-white/76 sm:text-lg">
              {slide.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
