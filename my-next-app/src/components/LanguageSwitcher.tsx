"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation'; // For App Router to potentially handle path-based i18n

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  // const router = useRouter();
  // const pathname = usePathname();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // For path-based i18n with App Router (e.g. /en/page, /nl/page)
    // You would typically change the route here.
    // Example:
    // const currentLang = i18n.language.split('-')[0]; // Get base language e.g. 'en' from 'en-US'
    // const newPathname = pathname.startsWith(`/${currentLang}`)
    //                   ? `/${lng}${pathname.substring(currentLang.length + 1)}`
    //                   : `/${lng}${pathname}`;
    // router.push(newPathname);

    // For non-path based i18n (language stored in cookie/localStorage, detected by LanguageDetector)
    // simply changing i18n language might be enough if your components re-render.
  };

  return (
    <div className="p-2 rounded-md shadow-md bg-gray-50 dark:bg-gray-700">
      <button
        onClick={() => changeLanguage('en')}
        disabled={i18n.language.startsWith('en')}
        className={`px-3 py-1 text-sm rounded-md mr-1 ${i18n.language.startsWith('en') ? 'bg-brand-red text-white cursor-default' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('nl')}
        disabled={i18n.language.startsWith('nl')}
        className={`px-3 py-1 text-sm rounded-md ${i18n.language.startsWith('nl') ? 'bg-brand-red text-white cursor-default' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
      >
        NL
      </button>
    </div>
  );
};

export default LanguageSwitcher;
