import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelmendoza.es";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ángel Mendoza | Consultor de Comunicación y Marketing para Clínicas",
    template: "%s | Ángel Mendoza",
  },
  description:
    "Consultor de comunicación y marketing especializado en salud. Más de 25 años ayudando a clínicas a mejorar su imagen, ganar confianza y captar primeras visitas. Reserva tu consultoría gratuita de 45 min.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ángel Mendoza — Tu consultor de cabecera",
    description:
      "Comunicación y marketing para clínicas y empresas de salud. Reserva una consultoría gratuita de 45 minutos.",
    url: siteUrl,
    siteName: "Ángel Mendoza",
    locale: "es_ES",
    type: "profile",
    images: [{ url: "/images/angel-hero-hq.png", width: 3326, height: 1892 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ángel Mendoza — Tu consultor de cabecera",
    description: "Comunicación y marketing para clínicas y empresas de salud.",
    images: ["/images/angel-hero-hq.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#005B85",
  colorScheme: "light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ángel Mendoza",
  jobTitle: "Consultor de Comunicación y Marketing",
  url: siteUrl,
  image: `${siteUrl}/images/angel-hero-hq.png`,
  worksFor: { "@type": "Organization", name: "rIL Medical" },
  knowsAbout: [
    "Marketing para clínicas",
    "Comunicación sector salud",
    "Captación de pacientes",
    "Marketing digital",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-ES">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
