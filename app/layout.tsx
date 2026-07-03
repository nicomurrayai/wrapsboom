import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wrap Boom | Wraps, combos y delivery",
  description:
    "Wrap Boom: wraps frescos, combos, ensaladas y opciones veggie. Explorá la carta online y pedí fácil.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Wrap Boom | Envuelto en sabor",
    description:
      "Wraps frescos, prácticos y llenos de sabor. Conocé la carta completa de Wrap Boom.",
    siteName: "Wrap Boom",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${bricolage.variable}`}>
        {children}
      </body>
    </html>
  );
}
