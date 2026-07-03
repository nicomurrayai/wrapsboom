import { siteConfig } from "@/lib/site-config";

export function OrderFab() {
  return (
    <a
      href={siteConfig.orderUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-boom-ink px-4 py-3 text-white shadow-[0_14px_35px_rgba(26,27,58,0.34)] transition duration-300 hover:-translate-y-1 hover:bg-boom-ink-soft sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5"
      aria-label="Abrir la carta online de Wrap Boom"
    >
      <OrderIcon />
      <span className="text-xs font-extrabold uppercase tracking-[0.12em] sm:text-sm">
        Pedí online
      </span>
    </a>
  );
}

function OrderIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
