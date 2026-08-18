import Image from "next/image";
import {
  LACARTA_MENU_URL,
  type LacartaMenuData,
  type LacartaProduct,
} from "@/lib/lacarta";
import { campaignAssets } from "@/lib/site-config";
import { ContactInquiryForm } from "./ContactInquiryForm";
import { ProductMedia } from "./ProductMedia";

type WrapBoomLandingProps = {
  menuData: LacartaMenuData | null;
  error: string | null;
};

type ProductGroup = {
  category: string;
  id: string;
  products: LacartaProduct[];
};

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const menuCollator = new Intl.Collator("es", {
  sensitivity: "base",
  numeric: true,
});

const compatibleImageHosts = new Set([
  "cdn.lacartaa.com",
  "tvqzwrzwaadgbcczjmqs.supabase.co",
]);

const featuredCategories = [
  {
    label: "El corazón de la carta",
    title: "Wraps",
    copy: "Clásicos, veggie y combinaciones con identidad propia.",
    image: campaignAssets.signature,
    href: "#wraps",
    className: "lg:col-span-6",
    imageClassName: "object-center",
  },
  {
    label: "Todo en uno",
    title: "Combos",
    copy: "Una comida completa, sin darle más vueltas.",
    image: campaignAssets.combo,
    href: "#combos",
    className: "lg:col-span-3",
    imageClassName: "object-center",
  },
  {
    label: "Fresco también va",
    title: "Ensaladas",
    copy: "Color, textura y opciones para elegir distinto.",
    image: campaignAssets.veggie,
    href: "#ensaladas",
    className: "lg:col-span-3",
    imageClassName: "object-left",
  },
] as const;

export function WrapBoomLanding({ menuData, error }: WrapBoomLandingProps) {
  const products = menuData?.products ?? [];
  const visibleProducts = products.filter((product) => product.show !== false);
  const groups = groupProducts(
    visibleProducts,
    menuData?.business.categoryOrder,
  );

  return (
    <>
      <BrandIntro productCount={visibleProducts.length} />
      <FeaturedCategories />
      <ProductMenu groups={groups} products={visibleProducts} error={error} />
      <BenefitsSection />
      <DeliverySection phoneNumber={menuData?.business.phoneNumber ?? null} />
      <ContactFooter phoneNumber={menuData?.business.phoneNumber ?? null} />
    </>
  );
}

function BrandIntro({ productCount }: { productCount: number }) {
  return (
    <section className="paper-noise silhouette-field section-shell overflow-hidden bg-boom-lavender text-boom-ink">
      <div
        className="absolute -right-20 -top-20 h-56 w-56 animate-[soft-float_8s_ease-in-out_infinite] rounded-full border-[34px] border-boom-ink/[0.055]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full border-[32px] border-white/24"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <p className="section-kicker text-boom-ink/62">Somos Wrap Boom</p>
          <h2 className="section-title max-w-3xl text-[clamp(2.8rem,5.3vw,5.2rem)]">
            Fresco, práctico y bien Boom.
          </h2>
        </div>

        <div className="max-w-2xl lg:ml-auto">
          <p className="text-lg font-semibold leading-7 sm:text-xl sm:leading-8">
            Wraps abundantes, ensaladas con color y combos pensados para comer
            rico sin complicarte.
          </p>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-6 text-boom-ink/64">
            Ingredientes que se ven, sabores que se entienden y una carta lista
            para acompañarte cuando aparece el hambre.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a href="#menu" className="button-primary">
              Explorar la carta
            </a>
            <a
              href={LACARTA_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-boom-ink/24 px-5 text-[0.8rem] font-extrabold tracking-[0.025em] text-boom-ink transition hover:-translate-y-0.5 hover:bg-white/55"
            >
              Pedí online
            </a>
          </div>
          <p className="mt-4 text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-boom-ink/46">
            {productCount > 0
              ? `${productCount} opciones disponibles hoy`
              : "Carta online disponible"}
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturedCategories() {
  return (
    <section className="silhouette-field silhouette-field-dark section-shell overflow-hidden bg-boom-ink text-white">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker text-boom-lavender">
            Elegí tu momento
          </p>
          <h2 className="section-title text-white">
            Hay un Boom para cada antojo.
          </h2>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {featuredCategories.map((category) => (
            <FeaturedCategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCategoryCard({
  label,
  title,
  copy,
  image,
  href,
  className,
  imageClassName,
}: (typeof featuredCategories)[number]) {
  return (
    <article
      className={`group relative min-h-[360px] overflow-hidden rounded-[1.5rem] border border-white/12 bg-boom-lavender shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 ${className}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`object-cover transition duration-700 group-hover:scale-[1.045] ${imageClassName}`}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-boom-ink via-boom-ink/88 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-5 sm:min-h-[390px] sm:p-6">
        <p className="section-kicker text-boom-lavender">{label}</p>
        <h3 className="mt-2 font-display text-4xl font-bold leading-none tracking-[-0.035em]">
          {title}
        </h3>
        <p className="mt-2 max-w-sm text-sm font-medium leading-6 text-white/72">
          {copy}
        </p>
        <a
          href={href}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-boom-lavender px-4 py-2.5 text-xs font-extrabold tracking-[0.025em] text-boom-ink transition hover:gap-3 hover:bg-white"
        >
          Ver opciones
          <ArrowDownIcon />
        </a>
      </div>
    </article>
  );
}

function ProductMenu({
  groups,
  products,
  error,
}: {
  groups: ProductGroup[];
  products: LacartaProduct[];
  error: string | null;
}) {
  return (
    <section
      id="menu"
      className="silhouette-field section-shell scroll-mt-24 overflow-hidden bg-boom-ivory text-boom-ink"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker text-boom-lavender-deep">
              La carta completa
            </p>
            <h2 className="section-title">
              Elegí sin vueltas.
            </h2>
          </div>
          <p className="max-w-2xl text-base font-medium leading-7 text-boom-ink/62 lg:ml-auto">
            Navegá por categorías y encontrá wraps, ensaladas, combos, postres,
            salsas y bebidas. Los productos y precios se actualizan directamente
            desde nuestra carta.
          </p>
        </div>

        {error ? (
          <MenuError />
        ) : products.length === 0 ? (
          <EmptyMenu />
        ) : (
          <>
            <nav
              className="mt-7 flex gap-2 overflow-x-auto pb-3"
              aria-label="Categorías de la carta"
            >
              {groups.map((group) => (
                <a
                  key={group.category}
                  href={`#${group.id}`}
                  className="shrink-0 rounded-full border border-boom-ink/12 bg-white/85 px-4 py-2 text-xs font-extrabold tracking-[0.02em] text-boom-ink/68 shadow-sm transition hover:-translate-y-0.5 hover:border-boom-ink/30 hover:bg-boom-lavender hover:text-boom-ink"
                >
                  {group.category}
                </a>
              ))}
            </nav>

            <div className="mt-8 space-y-14 md:space-y-16">
              {groups.map((group) => (
                <section
                  key={group.category}
                  id={group.id}
                  className="content-auto scroll-mt-28"
                >
                  <div className="mb-5 flex flex-col gap-3 border-b border-boom-ink/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="section-kicker text-boom-lavender-deep">
                        {group.products.length} opciones
                      </p>
                      <h3 className="mt-1.5 font-display text-3xl font-bold leading-none tracking-[-0.035em] sm:text-4xl">
                        {group.category}
                      </h3>
                    </div>
                    <a
                      href={LACARTA_MENU_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary w-fit"
                    >
                      Pedir
                    </a>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: LacartaProduct }) {
  const imageSrc = getProductImage(product);

  return (
    <article className="group overflow-hidden rounded-[1.25rem] border border-boom-ink/10 bg-white/95 shadow-[0_10px_28px_rgba(26,27,58,0.065)] transition duration-300 hover:-translate-y-1 hover:border-boom-lavender-deep/35 hover:shadow-[0_18px_38px_rgba(26,27,58,0.12)]">
      <ProductMedia src={imageSrc} alt={product.name} />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-base font-extrabold leading-snug text-boom-ink">
            {product.name}
          </h4>
          <p className="shrink-0 rounded-full bg-boom-lavender px-2.5 py-1 text-[0.8rem] font-extrabold text-boom-ink">
            {priceFormatter.format(product.price)}
          </p>
        </div>
        <p className="mt-2 line-clamp-3 min-h-[3.9rem] text-[0.82rem] leading-[1.3rem] text-boom-ink/58">
          {product.description?.trim() ||
            "Preparado con el sello fresco y sabroso de Wrap Boom."}
        </p>
      </div>
    </article>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      number: "01",
      title: "Ingredientes que se ven",
      copy: "Rellenos abundantes, texturas frescas y combinaciones sin misterio.",
    },
    {
      number: "02",
      title: "Carta para elegir",
      copy: "Wraps, opciones veggie, ensaladas, combos y algo dulce para cerrar.",
    },
    {
      number: "03",
      title: "Simple de pedir",
      copy: "Explorás la carta actualizada, elegís tu favorito y resolvés el antojo.",
    },
  ] as const;

  return (
    <section
      id="beneficios"
      className="silhouette-field silhouette-field-dark section-shell scroll-mt-24 overflow-hidden bg-boom-ink text-white"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="section-kicker text-boom-lavender">La propuesta</p>
          <h2 className="section-title text-white">
            Comer rico también puede ser fácil.
          </h2>
          <div className="mt-7 inline-flex rotate-[-3deg] rounded-full border border-boom-lavender/20 bg-boom-lavender/10 px-4 py-2 text-xs font-extrabold text-boom-lavender">
            Rico · fresco · sin vueltas
          </div>
        </div>

        <div className="divide-y divide-white/12 border-y border-white/12">
          {benefits.map((benefit) => (
            <article
              key={benefit.number}
              className="grid gap-3 py-5 sm:grid-cols-[64px_1fr] sm:gap-5 sm:py-6"
            >
              <p className="font-display text-lg font-extrabold text-boom-lavender">
                {benefit.number}
              </p>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-[-0.025em] sm:text-3xl">
                  {benefit.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/62">
                  {benefit.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliverySection({ phoneNumber }: { phoneNumber: string | null }) {
  return (
    <section
      id="delivery"
      className="paper-noise silhouette-field section-shell scroll-mt-24 overflow-hidden bg-boom-lavender text-boom-ink"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
        <div className="relative min-h-[340px] overflow-hidden rounded-[1.6rem] border border-boom-ink/10 bg-boom-lavender-soft shadow-[0_18px_48px_rgba(26,27,58,0.12)] sm:min-h-[440px] lg:min-h-[500px]">
          <Image
            src={campaignAssets.delivery}
            alt="Wraps listos para pedir por delivery"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>

        <div className="lg:pl-5">
          <p className="section-kicker text-boom-ink/58">Delivery y take away</p>
          <h2 className="section-title">
            Pedí fácil. Comé rico.
          </h2>
          <p className="mt-4 max-w-xl text-base font-medium leading-7 text-boom-ink/66">
            Entrá a la carta, elegí tus favoritos y armá tu pedido con los
            productos y precios siempre actualizados.
          </p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <OrderStep number="1" label="Explorá" />
            <OrderStep number="2" label="Elegí" />
            <OrderStep number="3" label="Disfrutá" />
          </div>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={LACARTA_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Abrir la carta
            </a>
            {phoneNumber ? (
              <a
                href={`tel:+${digitsOnly(phoneNumber)}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-boom-ink/24 px-5 text-[0.8rem] font-extrabold tracking-[0.025em] transition hover:-translate-y-0.5 hover:bg-white/50"
              >
                <PhoneIcon />
                {formatPhone(phoneNumber)}
              </a>
            ) : null}
          </div>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            <InfoTile label="Lunes a jueves" value="11 a 23 hs" />
            <InfoTile label="Viernes a domingo" value="11 a 23:30 hs" />
            <InfoTile label="Feriados" value="11 a 23:30 hs" />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-boom-ink/10 bg-white/38 p-3.5 transition hover:bg-white/55">
      <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-boom-ink/62">
        {label}
      </p>
      <p className="mt-1.5 text-base font-extrabold leading-tight text-boom-ink">
        {value}
      </p>
    </div>
  );
}

function OrderStep({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-[1.1rem] border border-boom-ink/10 bg-white/38 p-3.5 transition hover:-translate-y-0.5 hover:bg-white/55">
      <p className="font-display text-xl font-extrabold">{number.padStart(2, "0")}</p>
      <p className="mt-1.5 text-xs font-extrabold uppercase tracking-[0.13em] text-boom-ink/62">
        {label}
      </p>
    </div>
  );
}

function ContactFooter({ phoneNumber }: { phoneNumber: string | null }) {
  return (
    <section
      id="contacto"
      className="silhouette-field silhouette-field-dark section-shell scroll-mt-24 overflow-hidden bg-[#11122a] text-white"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-10">
        <div>
          <p className="section-kicker text-boom-lavender">Contacto</p>
          <h2 className="section-title text-white">
            Hablemos de tu próximo Boom.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/64">
            Consultas generales, pedidos especiales o información comercial.
            Dejanos tus datos y te respondemos a la brevedad.
          </p>

          <div className="mt-6">
            <p className="section-kicker text-white/42">Horarios</p>
            <p className="mt-3 text-sm leading-7 text-white/64">
              Lunes a jueves de 11 a 23 hs.
              <br />
              Viernes, sábado, domingo y feriados de 11 a 23:30 hs.
            </p>
          </div>

          {phoneNumber ? (
            <div className="mt-6">
              <p className="section-kicker text-white/42">Teléfono</p>
              <a
                href={`tel:+${digitsOnly(phoneNumber)}`}
                className="mt-3 inline-flex items-center gap-3 font-display text-2xl font-extrabold text-boom-lavender transition hover:text-white"
              >
                <PhoneIcon />
                {formatPhone(phoneNumber)}
              </a>
            </div>
          ) : null}
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_65px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:p-6">
          <ContactInquiryForm />
        </div>
      </div>

      <footer className="relative z-10 mx-auto mt-10 flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="relative h-12 w-12 overflow-hidden rounded-full bg-boom-lavender">
            <Image
              src="/logo.png"
              alt=""
              fill
              sizes="56px"
              className="object-contain"
            />
          </span>
          <div>
            <p className="font-display text-xl font-extrabold">
              Wrap Boom
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
              Envuelto en sabor
            </p>
          </div>
        </div>
        <a
          href={LACARTA_MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="button-lavender w-fit"
        >
          Pedí online
        </a>
      </footer>
    </section>
  );
}

function MenuError() {
  return (
    <div className="mt-8 rounded-[1.35rem] border border-boom-ink/12 bg-boom-lavender-soft p-6 sm:p-7">
      <p className="font-display text-2xl font-bold tracking-[-0.025em]">
        La carta se está actualizando.
      </p>
      <p className="mt-3 max-w-xl text-sm leading-6 text-boom-ink/62">
        Mientras vuelve la conexión, podés abrir el menú online y continuar tu
        pedido desde LaCarta.
      </p>
      <a
        href={LACARTA_MENU_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="button-primary mt-6"
      >
        Abrir menú online
      </a>
    </div>
  );
}

function EmptyMenu() {
  return (
    <div className="mt-8 rounded-[1.35rem] border border-boom-ink/12 bg-white p-6 sm:p-7">
      <p className="font-display text-2xl font-bold tracking-[-0.025em]">
        No hay productos disponibles.
      </p>
      <p className="mt-3 max-w-xl text-sm leading-6 text-boom-ink/62">
        La carta puede estar recibiendo cambios. Volvé a intentar en unos
        minutos.
      </p>
    </div>
  );
}

function groupProducts(
  products: LacartaProduct[],
  categoryOrder?: string[] | null,
): ProductGroup[] {
  const grouped = new Map<string, LacartaProduct[]>();

  for (const product of products) {
    const group = grouped.get(product.category) ?? [];
    group.push(product);
    grouped.set(product.category, group);
  }

  const categories = Array.from(grouped.keys());
  const configuredCategories = Array.from(new Set(categoryOrder ?? [])).filter(
    (category) => grouped.has(category),
  );
  const configuredCategorySet = new Set(configuredCategories);
  const remainingCategories = categories
    .filter((category) => !configuredCategorySet.has(category))
    .sort(menuCollator.compare);
  const orderedCategories = [
    ...configuredCategories,
    ...remainingCategories,
  ];

  return orderedCategories.map((category) => ({
    category,
    id: slugify(category),
    products: [...(grouped.get(category) ?? [])].sort(compareProducts),
  }));
}

function getProductImage(product: LacartaProduct) {
  if (product.contentType?.toLowerCase().startsWith("image/")) {
    const contentUrl = getCompatibleImageUrl(product.contentUrl);

    if (contentUrl) {
      return contentUrl;
    }
  }

  return getCompatibleImageUrl(product.thumbnail);
}

function getCompatibleImageUrl(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    const usesSupportedProtocol =
      url.protocol === "http:" || url.protocol === "https:";
    const isPlaceholder = url.pathname
      .toLowerCase()
      .endsWith("/image-placeholder.webp");

    if (
      !usesSupportedProtocol ||
      !compatibleImageHosts.has(url.hostname) ||
      isPlaceholder ||
      url.username ||
      url.password ||
      url.port
    ) {
      return null;
    }

    url.protocol = "https:";
    return url.toString();
  } catch {
    return null;
  }
}

function compareProducts(a: LacartaProduct, b: LacartaProduct) {
  const orderA = getFiniteOrder(a.order);
  const orderB = getFiniteOrder(b.order);

  if (orderA !== null && orderB === null) {
    return -1;
  }

  if (orderA === null && orderB !== null) {
    return 1;
  }

  if (orderA !== null && orderB !== null && orderA !== orderB) {
    return orderA - orderB;
  }

  const nameComparison = menuCollator.compare(a.name, b.name);

  if (nameComparison !== 0) {
    return nameComparison;
  }

  return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
}

function getFiniteOrder(order?: number | null) {
  return typeof order === "number" && Number.isFinite(order) ? order : null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function formatPhone(value: string) {
  const digits = digitsOnly(value);

  if (digits.startsWith("54911") && digits.length === 13) {
    return `+54 9 11 ${digits.slice(5, 9)}-${digits.slice(9)}`;
  }

  return `+${digits}`;
}

function ArrowDownIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

function PhoneIcon() {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
