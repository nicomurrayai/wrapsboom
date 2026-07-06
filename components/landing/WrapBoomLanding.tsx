import Image from "next/image";
import {
  LACARTA_MENU_URL,
  type LacartaMenuData,
  type LacartaProduct,
} from "@/lib/lacarta";
import { campaignAssets } from "@/lib/site-config";
import { ContactInquiryForm } from "./ContactInquiryForm";

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
    <section className="paper-noise relative isolate overflow-hidden bg-boom-lavender px-4 py-20 text-boom-ink sm:px-6 md:py-28">
      <div
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[54px] border-boom-ink/[0.055]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full border-[42px] border-white/28"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="section-kicker text-boom-ink/62">Somos Wrap Boom</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(3.5rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.065em] text-balance">
            Fresco, práctico y bien Boom.
          </h2>
        </div>

        <div className="max-w-2xl lg:ml-auto">
          <p className="text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">
            Wraps abundantes, ensaladas con color y combos pensados para comer
            rico sin complicarte.
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-boom-ink/64">
            Ingredientes que se ven, sabores que se entienden y una carta lista
            para acompañarte cuando aparece el hambre.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#menu" className="button-primary">
              Explorar la carta
            </a>
            <a
              href={LACARTA_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-boom-ink/28 px-7 text-sm font-extrabold uppercase tracking-[0.12em] text-boom-ink transition hover:bg-white/55"
            >
              Pedí online
            </a>
          </div>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-boom-ink/46">
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
    <section className="bg-boom-ink px-4 py-20 text-white sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="section-kicker text-boom-lavender">
            Elegí tu momento
          </p>
          <h2 className="mt-5 font-display text-[clamp(3rem,6vw,6rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.055em] text-balance">
            Hay un Boom para cada antojo.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
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
      className={`group relative min-h-[440px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-boom-lavender ${className}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`object-cover transition duration-700 group-hover:scale-[1.035] ${imageClassName}`}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[58%] bg-boom-ink/88"
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-h-[440px] flex-col justify-end p-6 sm:p-8">
        <p className="section-kicker text-boom-lavender">{label}</p>
        <h3 className="mt-3 font-display text-5xl font-extrabold uppercase leading-none tracking-[-0.045em]">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm font-medium leading-6 text-white/72">
          {copy}
        </p>
        <a
          href={href}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-boom-lavender px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-boom-ink transition hover:bg-white"
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
      className="scroll-mt-24 bg-boom-ivory px-4 py-20 text-boom-ink sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker text-boom-lavender-deep">
              La carta completa
            </p>
            <h2 className="mt-5 font-display text-[clamp(3.25rem,6vw,6rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.06em] text-balance">
              Elegí sin vueltas.
            </h2>
          </div>
          <p className="max-w-2xl text-lg font-medium leading-8 text-boom-ink/62 lg:ml-auto">
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
              className="mt-10 flex gap-2 overflow-x-auto pb-4"
              aria-label="Categorías de la carta"
            >
              {groups.map((group) => (
                <a
                  key={group.category}
                  href={`#${group.id}`}
                  className="shrink-0 rounded-full border border-boom-ink/12 bg-white px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.1em] text-boom-ink/68 transition hover:border-boom-ink hover:bg-boom-lavender hover:text-boom-ink"
                >
                  {group.category}
                </a>
              ))}
            </nav>

            <div className="mt-10 space-y-20">
              {groups.map((group) => (
                <section
                  key={group.category}
                  id={group.id}
                  className="content-auto scroll-mt-28"
                >
                  <div className="mb-7 flex flex-col gap-4 border-b border-boom-ink/12 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="section-kicker text-boom-lavender-deep">
                        {group.products.length} opciones
                      </p>
                      <h3 className="mt-2 font-display text-4xl font-extrabold uppercase leading-none tracking-[-0.04em] sm:text-5xl">
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
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    <article className="group overflow-hidden rounded-[1.4rem] border border-boom-ink/10 bg-white shadow-[0_18px_45px_rgba(26,27,58,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(26,27,58,0.13)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-boom-lavender-soft">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="paper-noise relative flex h-full items-center justify-center bg-boom-lavender px-6 text-center">
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

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-lg font-extrabold leading-tight text-boom-ink">
            {product.name}
          </h4>
          <p className="shrink-0 rounded-full bg-boom-lavender px-3 py-1.5 text-sm font-extrabold text-boom-ink">
            {priceFormatter.format(product.price)}
          </p>
        </div>
        <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-boom-ink/58">
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
      className="scroll-mt-24 overflow-hidden bg-boom-ink px-4 py-20 text-white sm:px-6 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="section-kicker text-boom-lavender">La propuesta</p>
          <h2 className="mt-5 font-display text-[clamp(3.4rem,6vw,6.4rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em] text-balance">
            Comer rico también puede ser fácil.
          </h2>
          <div
            className="mt-10 h-52 w-52 rounded-full border-[34px] border-boom-lavender/16 sm:h-64 sm:w-64"
            aria-hidden="true"
          />
        </div>

        <div className="divide-y divide-white/12 border-y border-white/12">
          {benefits.map((benefit) => (
            <article
              key={benefit.number}
              className="grid gap-5 py-8 sm:grid-cols-[84px_1fr] sm:py-10"
            >
              <p className="font-display text-2xl font-extrabold text-boom-lavender">
                {benefit.number}
              </p>
              <div>
                <h3 className="font-display text-3xl font-extrabold uppercase tracking-[-0.035em] sm:text-4xl">
                  {benefit.title}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-white/62">
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
      className="paper-noise scroll-mt-24 bg-boom-lavender px-4 py-20 text-boom-ink sm:px-6 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-boom-ink/10 bg-boom-lavender-soft shadow-[0_24px_65px_rgba(26,27,58,0.13)] sm:min-h-[560px]">
          <Image
            src={campaignAssets.delivery}
            alt="Wraps listos para pedir por delivery"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>

        <div className="lg:pl-8">
          <p className="section-kicker text-boom-ink/58">Delivery y take away</p>
          <h2 className="mt-5 font-display text-[clamp(3.5rem,6vw,6.5rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em] text-balance">
            Pedí fácil. Comé rico.
          </h2>
          <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-boom-ink/66">
            Entrá a la carta, elegí tus favoritos y armá tu pedido con los
            productos y precios siempre actualizados.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <OrderStep number="1" label="Explorá" />
            <OrderStep number="2" label="Elegí" />
            <OrderStep number="3" label="Disfrutá" />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-boom-ink/24 px-6 text-sm font-extrabold uppercase tracking-[0.1em] transition hover:bg-white/50"
              >
                <PhoneIcon />
                {formatPhone(phoneNumber)}
              </a>
            ) : null}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
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
    <div className="rounded-2xl border border-boom-ink/12 bg-white/36 p-4">
      <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-boom-ink/62">
        {label}
      </p>
      <p className="mt-2 text-lg font-extrabold leading-tight text-boom-ink">
        {value}
      </p>
    </div>
  );
}

function OrderStep({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-boom-ink/12 bg-white/36 p-4">
      <p className="font-display text-2xl font-extrabold">{number.padStart(2, "0")}</p>
      <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.15em] text-boom-ink/62">
        {label}
      </p>
    </div>
  );
}

function ContactFooter({ phoneNumber }: { phoneNumber: string | null }) {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 bg-[#11122a] px-4 py-20 text-white sm:px-6 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="section-kicker text-boom-lavender">Contacto</p>
          <h2 className="mt-5 font-display text-[clamp(3.5rem,6vw,6.4rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em] text-balance">
            Hablemos de tu próximo Boom.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/64">
            Consultas generales, pedidos especiales o información comercial.
            Dejanos tus datos y te respondemos a la brevedad.
          </p>

          <div className="mt-9">
            <p className="section-kicker text-white/42">Horarios</p>
            <p className="mt-3 text-sm leading-7 text-white/64">
              Lunes a jueves de 11 a 23 hs.
              <br />
              Viernes, sábado, domingo y feriados de 11 a 23:30 hs.
            </p>
          </div>

          {phoneNumber ? (
            <div className="mt-9">
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

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.3)] sm:p-8">
          <ContactInquiryForm />
        </div>
      </div>

      <footer className="mx-auto mt-16 flex max-w-7xl flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="relative h-14 w-14 overflow-hidden rounded-full bg-boom-lavender">
            <Image
              src="/logo.png"
              alt=""
              fill
              sizes="56px"
              className="object-contain"
            />
          </span>
          <div>
            <p className="font-display text-2xl font-extrabold uppercase">
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
    <div className="mt-12 rounded-[1.5rem] border border-boom-ink/12 bg-boom-lavender-soft p-7 sm:p-9">
      <p className="font-display text-3xl font-extrabold uppercase tracking-[-0.035em]">
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
    <div className="mt-12 rounded-[1.5rem] border border-boom-ink/12 bg-white p-7 sm:p-9">
      <p className="font-display text-3xl font-extrabold uppercase tracking-[-0.035em]">
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
  const orderedCategories =
    categoryOrder && categoryOrder.length > 0
      ? [
          ...categoryOrder.filter((category) => grouped.has(category)),
          ...categories.filter((category) => !categoryOrder.includes(category)),
        ]
      : categories;

  return orderedCategories.map((category) => ({
    category,
    id: slugify(category),
    products: grouped.get(category) ?? [],
  }));
}

function getProductImage(product: LacartaProduct) {
  let imageUrl: string | null = null;

  if (
    product.contentType?.startsWith("image") &&
    product.contentUrl?.startsWith("http")
  ) {
    imageUrl = product.contentUrl;
  } else if (product.thumbnail?.startsWith("http")) {
    imageUrl = product.thumbnail;
  }

  return imageUrl ? getSupabaseImageUrl(imageUrl) : null;
}

function getSupabaseImageUrl(value: string) {
  try {
    const url = new URL(value);

    if (
      url.hostname === "tvqzwrzwaadgbcczjmqs.supabase.co" &&
      url.pathname.includes("/storage/v1/object/public/")
    ) {
      url.pathname = url.pathname.replace(
        "/storage/v1/object/public/",
        "/storage/v1/render/image/public/",
      );
      url.searchParams.set("width", "720");
      url.searchParams.set("height", "540");
      url.searchParams.set("quality", "72");
      url.searchParams.set("resize", "cover");
    }

    return url.toString();
  } catch {
    return value;
  }
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
