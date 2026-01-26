import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";
import { Inter, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krinch & Partners | Conseil RH & Transformation",
  description: "Excellence, Sobriété et Crédibilité. Cabinet de conseil RH & Transformation basé au Cameroun avec une ambition internationale.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <ProgressBarProvider>
          {children}
        </ProgressBarProvider>
        <CookieConsent locale={locale} dict={dict} />
      </body>
    </html>
  );
}
