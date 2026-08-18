"use client";

import Image from "next/image";
import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import { NavDropdown } from "./NavDropdown";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[55] bg-boom-ink/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        id="mobile-menu"
        className={`fixed right-0 top-0 z-[60] flex h-full w-[min(100%,350px)] flex-col bg-boom-ink shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        inert={!open}
        aria-label="Menú de navegación"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-full bg-boom-lavender">
              <Image
                src={siteConfig.brand.logoSrc}
                alt=""
                fill
                sizes="48px"
                className="object-contain"
              />
            </span>
            <span className="font-display text-lg font-extrabold uppercase text-white">
              Wrap Boom
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/12 p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Cerrar menú"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-6">
          {siteConfig.nav.links.map((link) => (
            <NavDropdown
              key={link.href}
              link={link}
              variant="mobile"
              onNavigate={onClose}
            />
          ))}
        </nav>

        <div className="paper-noise border-t border-white/10 bg-boom-lavender p-5 text-boom-ink">
          <p className="font-display text-2xl font-extrabold leading-none">
            Envuelto en sabor.
          </p>
        </div>
      </div>
    </>
  );
}
