'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { defaultLocale, isValidLocale } from '@/lib/i18n';

export default function SetLangAttribute() {
  const params = useParams();
  // Ensure params.locale is treated as string | undefined
  const localeParam = typeof params?.locale === 'string' ? params.locale : undefined;

  // Determine the language to set
  const langToSet = isValidLocale(localeParam || '') ? localeParam : defaultLocale;

  useEffect(() => {
    if (langToSet) {
      document.documentElement.lang = langToSet;
    }
  }, [langToSet]);

  return null; // This component does not render anything
}
