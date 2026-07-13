"use client";

import Image from "next/image";
import { useState } from "react";

type ProductMediaProps = {
  src: string | null;
  alt: string;
};

const productImageSizes =
  "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw";

export function ProductMedia({ src, alt }: ProductMediaProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = src && failedSrc !== src ? src : null;

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-boom-lavender-soft">
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt=""
            aria-hidden="true"
            fill
            sizes={productImageSizes}
            className="scale-110 object-cover opacity-40 blur-xl"
            onError={() => setFailedSrc(imageSrc)}
          />
          <div
            className="absolute inset-0 bg-boom-lavender-soft/45"
            aria-hidden="true"
          />
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes={productImageSizes}
            className="z-10 scale-[0.96] object-contain transition-transform duration-500 group-hover:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-[0.96]"
            onError={() => setFailedSrc(imageSrc)}
          />
        </>
      ) : (
        <div
          className="paper-noise relative flex h-full items-center justify-center bg-boom-lavender px-6 text-center"
          role="img"
          aria-label={`${alt}, imagen no disponible`}
        >
          <div
            className="absolute h-36 w-36 rounded-full border-[22px] border-boom-ink/8"
            aria-hidden="true"
          />
          <p className="relative font-display text-2xl font-extrabold uppercase text-boom-ink/68">
            Wrap Boom
          </p>
        </div>
      )}
    </div>
  );
}
