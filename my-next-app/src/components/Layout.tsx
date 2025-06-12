"use client"; // Layout becomes a client component to use LanguageSwitcher and potentially useTranslation

import React from 'react';
import { useTranslation } from 'react-i18next'; // For translating any text within Layout itself
import LanguageSwitcher from './LanguageSwitcher'; // Import the switcher

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation('common');
  // TODO: Add logic for active link highlighting based on i18n.language or Next router
  const currentPath = '/'; // Placeholder, ideally use usePathname() from next/navigation

  return (
    <div className="flex flex-col min-h-screen font-lato text-brand-gray text-lg leading-relaxed">
      <header className="bg-brand-red text-white p-6 md:p-8"> {/* Adjusted padding */}
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold m-0">
                {t('siteTitle', 'Site Title Placeholder')}
              </h1>
              <p className="text-gray-200 italic mt-1 text-base hidden sm:block">
                {/* Example of a tagline that could be translated */}
                A tagline for the site.
              </p>
            </div>
            <LanguageSwitcher />
          </div>

          <nav className="mt-4">
            <ul className="list-none m-0 p-0 flex flex-col md:flex-row md:space-x-2"> {/* Reduced space-x */}
              <li className="border-t-2 border-red-400 md:border-t-0 first:border-t-0">
                <a
                  href={`/${i18n.language}/`} // Example for language-prefixed routes
                  className={`border-0 block py-2 px-3 hover:text-gray-300 rounded-md ${currentPath === '/' ? 'bg-white text-brand-red font-semibold' : 'text-white hover:bg-red-500'}`}
                >
                  {t('navHome', 'Home')}
                </a>
              </li>
              <li className="border-t-2 border-red-400 md:border-t-0">
                <a
                  href={`/${i18n.language}/about`} // Example
                  className={`border-0 block py-2 px-3 hover:text-gray-300 rounded-md ${currentPath === '/about' ? 'bg-white text-brand-red font-semibold' : 'text-white hover:bg-red-500'}`}
                >
                  {t('navAbout', 'About')}
                </a>
              </li>
              <li className="border-t-2 border-red-400 md:border-t-0">
                <a
                  href={`/${i18n.language}/contact`} // Example
                  className={`border-0 block py-2 px-3 hover:text-gray-300 rounded-md ${currentPath === '/contact' ? 'bg-white text-brand-red font-semibold' : 'text-white hover:bg-red-500'}`}
                >
                  {t('navContact', 'Contact')}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-50 text-gray-400 py-10 px-4 text-center">
        <p className="text-sm" dangerouslySetInnerHTML={{
          __html: t('footerCopyright', { year: new Date().getFullYear() })
            .replace('HTML5 UP', '<a href="https://html5up.net" target="_blank" rel="noopener noreferrer" class="text-brand-red hover:underline">HTML5 UP</a>')
            .replace('AI', '<span class="font-semibold">AI</span>')
        }} />
        <ul className="list-none p-0 mt-2 text-xs">
          <li className="inline-block border-l border-gray-300 ml-2 pl-2 first:ml-0 first:pl-0 first:border-l-0">
            <a href="#" className="text-gray-400 hover:text-brand-red border-b-0">Privacy Policy</a>
          </li>
          <li className="inline-block border-l border-gray-300 ml-2 pl-2">
            <a href="#" className="text-gray-400 hover:text-brand-red border-b-0">Terms of Use</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Layout;
