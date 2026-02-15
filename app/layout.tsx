import type { Metadata } from "next";
import { Outfit, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description.ru,
  keywords: [...SITE_CONFIG.keywords.ru],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/ru",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_CONFIG.baseUrl,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description.ru,
    siteName: SITE_CONFIG.name,
    images: [{
      url: "/og-image.png", // Make sure this file exists in public/
      width: 1200,
      height: 630,
      alt: SITE_CONFIG.name,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description.ru,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { TelegramWidget, YandexMetrika } from "@/components/social-widgets";
import { Toaster } from "sonner";
import { getContent } from "@/app/actions/content";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contentResult = await getContent();
  const content = contentResult?.data;
  const lang = contentResult?.lang || "ru";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.baseUrl,
    "logo": `${SITE_CONFIG.baseUrl}/logo.png`, // Placeholder for future logo file
    "description": SITE_CONFIG.description[lang as keyof typeof SITE_CONFIG.description],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Phuket",
      "addressCountry": "TH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": SITE_CONFIG.contact.email.clients,
      "contactType": "customer service"
    }
  };

  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${bebasNeue.variable} font-sans antialiased overflow-x-hidden`}>
        <div className="relative min-h-screen overflow-x-hidden">
          {children}
        </div>
        <TelegramWidget telegram={content?.contacts?.telegram} />
        <YandexMetrika id={content?.site?.yandexMetrikaId} />
        <Toaster theme="dark" position="top-center" />
      </body>
    </html>
  );
}
