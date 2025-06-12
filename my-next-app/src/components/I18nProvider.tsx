"use client"; // This is a client component

import React, { ReactNode, useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // For App Router
import nextI18NextConfig from '../../next-i18next.config.js'; // Adjust path as needed

// Initialize i18next
i18n
  .use(HttpApi) // Loads translations from backend (e.g., /locales/en/common.json)
  .use(LanguageDetector) // Detects user language
  .init({
    ...nextI18NextConfig.i18n, // Spread the i18n part of your config
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
    fallbackLng: nextI18NextConfig.i18n.defaultLocale,
    defaultNS: nextI18NextConfig.defaultNS || 'common',
    ns: ['common'], // Add more namespaces if you have them
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    react: {
      useSuspense: false, // Important for Next.js
    },
  });

interface I18nProviderProps {
  children: ReactNode;
  // If you are passing an initial locale from the server (e.g. via params in layout)
  // locale?: string;
}

const I18nAppProvider: React.FC<I18nProviderProps> = ({ children /*, locale*/ }) => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   // This is an example of how you might change language
  //   // based on a prop or route parameter.
  //   // For App Router, locale changes often involve re-routing to /<locale>/...
  //   if (locale && i18n.language !== locale) {
  //     i18n.changeLanguage(locale);
  //   }
  // }, [locale]);

  // This effect will run when the language changes via i18n.changeLanguage()
  // It's useful if you need to sync Next.js router with i18next language state,
  // though for App Router, language is usually part of the path.
  // useEffect(() => {
  //   const handleLanguageChanged = (lng: string) => {
  //     // console.log("Language changed to: ", lng);
  //     // Example: if your routes are /en/about, /nl/about
  //     // const newPath = `/${lng}${pathname.startsWith(`/${i18n.options.fallbackLng}`) ? pathname.substring(3) : pathname}`;
  //     // router.push(newPath);
  //   };
  //   i18n.on('languageChanged', handleLanguageChanged);
  //   return () => {
  //     i18n.off('languageChanged', handleLanguageChanged);
  //   };
  // }, [pathname, router]);


  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nAppProvider;
