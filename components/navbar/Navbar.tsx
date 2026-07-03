"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { siteConfig } from "@/lib/site-config";
import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";

export function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-[1.35rem] border px-3 py-2.5 backdrop-blur-xl transition-all duration-300 sm:px-4 ${
            scrolled
              ? "border-white/12 bg-boom-ink/94 shadow-[0_14px_50px_rgba(26,27,58,0.25)]"
              : "border-white/15 bg-boom-ink/82"
          }`}
          aria-label="Navegación principal"
        >
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center gap-3"
            aria-label="Wrap Boom, inicio"
          >
            <span className="relative h-14 w-14 overflow-hidden rounded-full bg-boom-lavender shadow-[0_8px_25px_rgba(0,0,0,0.22)] sm:h-16 sm:w-16">
              <Image
                src={siteConfig.brand.logoSrc}
                alt={siteConfig.brand.name}
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </span>
            <span className="hidden font-display text-lg font-extrabold uppercase tracking-[-0.03em] text-white sm:block">
              Wrap Boom
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {siteConfig.nav.links.map((link) => (
              <NavDropdown key={link.href} link={link} />
            ))}
          </div>

          <button
            type="button"
            className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/12 text-white lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
