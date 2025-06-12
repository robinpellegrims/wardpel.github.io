import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations } from "@/lib/translations";
import { isValidLocale, locales } from "@/lib/i18n";
import "../../globals.css"; // Corrected path

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Reverted
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params; // Reverted
  const locale = isValidLocale(localeParam) ? localeParam : 'en';
  const t = getTranslations(locale);
  
  // Determine canonical URLs with trailing slashes
  const canonicalEnUrl = "https://wardpellegrims.be/en/";
  const canonicalNlUrl = "https://wardpellegrims.be/nl/";
  const rootUrl = "https://wardpellegrims.be/";

  let currentCanonicalUrl: string;
  if (locale === 'en') {
    currentCanonicalUrl = canonicalEnUrl;
  } else if (locale === 'nl') {
    currentCanonicalUrl = canonicalNlUrl;
  } else {
    // Should not happen with generateStaticParams but good for safety
    currentCanonicalUrl = rootUrl;
  }

  return {
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: "Ward Pellegrims" }],
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
      ],
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" }
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: currentCanonicalUrl, // Use the locale-specific canonical URL
      siteName: 'Ward Pellegrims Coaching',
      locale: locale === 'en' ? 'en_US' : 'nl_BE',
      type: 'website',
    },
    alternates: {
      canonical: currentCanonicalUrl, // Use the locale-specific canonical URL
      languages: {
        'en': canonicalEnUrl,
        'nl': canonicalNlUrl,
        'x-default': rootUrl,
      },
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
}: // Removed _params from destructuring, Props type still enforces its presence
Props) {
  // Params are not used in this component directly.
  // generateMetadata in this file DOES use params.

  return (
    <>
      {children}
      <Script 
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      />
    </>
  );
}