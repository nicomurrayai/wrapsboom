"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavLink } from "@/lib/site-config";

type NavDropdownProps = {
  link: NavLink;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function NavDropdown({
  link,
  onNavigate,
  variant = "desktop",
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  if (!link.children?.length) {
    return (
      <NavItemLink
        link={link}
        onNavigate={onNavigate}
        className={
          variant === "mobile"
            ? link.highlight
              ? "button-lavender mt-2 w-full"
              : "text-lg font-bold text-white transition-colors hover:text-boom-lavender"
            : link.highlight
              ? "rounded-full bg-boom-lavender px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.12em] text-boom-ink transition hover:bg-white"
              : "text-sm font-bold text-white transition-colors hover:text-boom-lavender"
        }
      />
    );
  }

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex items-center justify-between text-left text-lg font-bold text-white transition-colors hover:text-boom-lavender"
          aria-expanded={open}
        >
          {link.label}
          <ChevronIcon
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open ? (
          <div className="flex flex-col gap-3 border-l border-boom-lavender/40 pl-4">
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                className="text-base font-semibold text-white/72 transition-colors hover:text-boom-lavender"
              >
                {child.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-boom-lavender"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {link.label}
        <ChevronIcon className="transition-transform group-hover:rotate-180" />
      </button>
      <div
        className={`absolute left-0 top-full z-50 min-w-[190px] pt-3 transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-white/12 bg-boom-ink p-1.5 shadow-2xl">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-white/75 transition-colors hover:bg-boom-lavender hover:text-boom-ink"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavItemLink({
  link,
  onNavigate,
  className,
}: {
  link: NavLink;
  onNavigate?: () => void;
  className: string;
}) {
  if (link.href.startsWith("http")) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={className}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} onClick={onNavigate} className={className}>
      {link.label}
    </Link>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${className ?? ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
