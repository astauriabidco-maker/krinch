import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import ProgressBarProvider from "@/components/ui/ProgressBarProvider";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Krinch & Partners | Conseil RH & Transformation",
  description: "Excellence, Sobriété et Crédibilité. Cabinet de conseil RH & Transformation basé au Cameroun avec une ambition internationale.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.krinchpartners.com/",
    siteName: "Krinch & Partners",
    images: [
      {
        url: "/images/krinch-og.jpg", // Make sure this file exists or is planned
        width: 1200,
        height: 630,
        alt: "Krinch & Partners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krinch & Partners",
    description: "Excellence, Sobriété et Crédibilité. Cabinet de conseil RH & Transformation basé au Cameroun avec une ambition internationale.",
    images: ["/images/krinch-og.jpg"],
  },
};

import { db } from "@/lib/db";
import { sanitizeCssValue } from "@/lib/sanitize";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  let brandSettings = null;
  try {
    brandSettings = await db.brandSettings.findUnique({ where: { id: 'default' } });
  } catch (e) {
    console.error("Failed to load brand settings", e);
  }

  // Generate dynamic CSS block with sanitized values
  const brandCss = brandSettings ? `
    :root {
      --color-primary: ${sanitizeCssValue(brandSettings.primaryColor)};
      --color-secondary: ${sanitizeCssValue(brandSettings.secondaryColor)};
      --color-accent: ${sanitizeCssValue(brandSettings.accentColor)};
      ${brandSettings.fontFamily !== 'Inter' ? `--font-sans: ${sanitizeCssValue(`'${brandSettings.fontFamily}', sans-serif`)};` : ''}
    }
  ` : '';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd />
        {/* Load Google Font dynamically if not Inter */}
        {brandSettings?.fontFamily && brandSettings.fontFamily !== 'Inter' && (
          <link href={`https://fonts.googleapis.com/css2?family=${brandSettings.fontFamily.replace(/ /g, '+')}:wght@300;400;500;600;700;800&display=swap`} rel="stylesheet" />
        )}
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning
      >
        {brandCss && <style dangerouslySetInnerHTML={{ __html: brandCss }} />}
        <ProgressBarProvider>
          {children}
        </ProgressBarProvider>
        <CookieConsent locale={locale} dict={dict} />
      </body>
    </html>
  );
}
