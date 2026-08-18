import Image from "next/image";
import {
  LACARTA_MENU_URL,
  type LacartaMenuData,
} from "@/lib/lacarta";
import { campaignAssets } from "@/lib/site-config";
import { ContactInquiryForm } from "./ContactInquiryForm";

type WrapBoomLandingProps = {
  menuData: LacartaMenuData | null;
};

const fallbackWhatsAppNumber = "5491164955664";
const whatsappMessage = "Hola, quiero hacer un pedido en Wrap Boom.";

const featuredCategories = [
  {
    label: "El corazón de la carta",
    title: "Wraps",
    copy: "Clásicos, veggie y combinaciones con identidad propia.",
    image: campaignAssets.signature,
    className: "lg:col-span-6",
    imageClassName: "object-center",
  },
  {
    label: "Todo en uno",
    title: "Combos",
    copy: "Una comida completa, sin darle más vueltas.",
    image: campaignAssets.combo,
    className: "lg:col-span-3",
    imageClassName: "object-center",
  },
  {
    label: "Fresco también va",
    title: "Ensaladas",
    copy: "Color, textura y opciones para elegir distinto.",
    image: campaignAssets.veggie,
    className: "lg:col-span-3",
    imageClassName: "object-left",
  },
] as const;

export function WrapBoomLanding({ menuData }: WrapBoomLandingProps) {
  const phoneNumber = menuData?.business.phoneNumber ?? null;
  const whatsappUrl = getWhatsAppUrl(phoneNumber);

  return (
    <>
      <BrandIntro />
      <FeaturedCategories whatsappUrl={whatsappUrl} />
      <BenefitsSection />
      <DeliverySection phoneNumber={phoneNumber} />
      <ContactFooter phoneNumber={phoneNumber} />
    </>
  );
}

function BrandIntro() {
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
            <a href="#antojos" className="button-primary">
              Ver opciones
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
            Pedidos online y por WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturedCategories({ whatsappUrl }: { whatsappUrl: string }) {
  return (
    <section
      id="antojos"
      className="silhouette-field silhouette-field-dark section-shell scroll-mt-24 overflow-hidden bg-boom-ink text-white"
    >
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
            <FeaturedCategoryCard
              key={category.title}
              {...category}
              whatsappUrl={whatsappUrl}
            />
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
  whatsappUrl,
  className,
  imageClassName,
}: (typeof featuredCategories)[number] & { whatsappUrl: string }) {
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
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-boom-lavender px-4 py-2.5 text-xs font-extrabold tracking-[0.025em] text-boom-ink transition hover:gap-3 hover:bg-white"
        >
          Ver opciones
          <ArrowUpRightIcon />
        </a>
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

function getWhatsAppUrl(phoneNumber: string | null) {
  const number = digitsOnly(phoneNumber ?? "") || fallbackWhatsAppNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage)}`;
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

function ArrowUpRightIcon() {
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
      <path d="M7 17 17 7M8 7h9v9" />
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
