export type NavLink = {
  label: string;
  href: string;
  highlight?: boolean;
  children?: { label: string; href: string }[];
};

export type HeroCta = {
  label: string;
  href: string;
  variant: "primary" | "outline";
};

export type HeroSlide = {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  contentAlign: "left" | "right";
  ctas: HeroCta[];
};

export const campaignAssets = {
  signature: "/hero-signature.webp",
  veggie: "/hero-veggie.webp",
  combo: "/hero-combo.webp",
  delivery: "/hero-delivery.webp",
} as const;

const orderUrl = "https://www.lacartaa.com/wraps-boom-1";

export const siteConfig = {
  brand: {
    name: "Wrap Boom",
    logoSrc: "/logo.png",
  },
  nav: {
    links: [
      {
        label: "Productos",
        href: "#menu",
        children: [
          { label: "Wraps", href: "#wraps" },
          { label: "Ensaladas", href: "#ensaladas" },
          { label: "Combos", href: "#combos" },
          { label: "Postres", href: "#postres" },
        ],
      },
      { label: "Por qué Wrap", href: "#beneficios" },
      { label: "Cómo pedir", href: "#delivery" },
      { label: "Contacto", href: "#contacto" },
      {
        label: "Pedí online",
        href: orderUrl,
        highlight: true,
      },
    ] satisfies NavLink[],
  },
  heroSlides: [
    {
      image: campaignAssets.signature,
      badge: "Envuelto en sabor",
      title: "Wraps frescos. Sabor en serio.",
      subtitle: "Ingredientes que se ven, combinaciones que se disfrutan.",
      contentAlign: "left",
      ctas: [
        { label: "Pedí online", href: orderUrl, variant: "primary" },
        { label: "Ver la carta", href: "#menu", variant: "outline" },
      ],
    },
    {
      image: campaignAssets.veggie,
      badge: "Opción veggie",
      title: "Color, frescura y mucho Boom.",
      subtitle: "Una mezcla liviana, abundante y llena de textura.",
      contentAlign: "right",
      ctas: [
        { label: "Ver wraps", href: "#wraps", variant: "primary" },
        { label: "Pedí online", href: orderUrl, variant: "outline" },
      ],
    },
    {
      image: campaignAssets.combo,
      badge: "Combo completo",
      title: "Todo resuelto en un solo pedido.",
      subtitle: "Wrap, ensalada y ese antojo que no necesitaba explicación.",
      contentAlign: "left",
      ctas: [
        { label: "Ver combos", href: "#combos", variant: "primary" },
        { label: "Explorar carta", href: "#menu", variant: "outline" },
      ],
    },
    {
      image: campaignAssets.delivery,
      badge: "Delivery",
      title: "Pedí fácil. Comé rico.",
      subtitle: "Tu próximo Wrap Boom está a pocos clics.",
      contentAlign: "left",
      ctas: [
        { label: "Pedir ahora", href: orderUrl, variant: "primary" },
        { label: "Cómo pedir", href: "#delivery", variant: "outline" },
      ],
    },
  ] satisfies HeroSlide[],
  orderUrl,
} as const;
