"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { HeroControls } from "./HeroControls";
import { HeroSlide } from "./HeroSlide";

export function HeroSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplay = useRef(
    Autoplay({ delay: 5600, stopOnInteraction: true, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 28 },
    [autoplay.current],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncAutoplay = () => {
      if (mediaQuery.matches) {
        autoplay.current.stop();
      } else {
        autoplay.current.play();
      }
    };

    syncAutoplay();
    mediaQuery.addEventListener("change", syncAutoplay);
    return () => mediaQuery.removeEventListener("change", syncAutoplay);
  }, [emblaApi]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") scrollPrev();
    if (event.key === "ArrowRight") scrollNext();
  }

  return (
    <section
      className="relative min-h-[740px] w-full overflow-hidden bg-boom-lavender"
      aria-label="Propuestas destacadas de Wrap Boom"
      aria-roledescription="carrusel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {siteConfig.heroSlides.map((slide, index) => (
            <HeroSlide
              key={slide.image}
              slide={slide}
              priority={index === 0}
            />
          ))}
        </div>
      </div>

      <HeroControls
        slideCount={siteConfig.heroSlides.length}
        selectedIndex={selectedIndex}
        onPrev={scrollPrev}
        onNext={scrollNext}
        onDotClick={scrollTo}
      />
    </section>
  );
}
