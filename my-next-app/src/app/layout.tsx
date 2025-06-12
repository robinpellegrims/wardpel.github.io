import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google"; // Assuming Lato was for the body font
import "./globals.css";
import I18nAppProvider from "@/components/I18nProvider"; // Path alias

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const lato = Lato({
  subsets: ["latin"],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lato' // If you want to use it via CSS variable
});

export const metadata: Metadata = {
  title: "Ward Pellegrims Coaching", // This could also be translated later
  description: "Personal coaching for swimming, cycling, and running.", // And this
};

interface RootLayoutProps {
  children: React.ReactNode;
  // For App router, locale is usually passed via params if using dynamic segments for locales
  // params: { locale: string };
}

export default function RootLayout({
  children,
  // params, // Example: if your directory structure is app/[locale]/layout.tsx
}: Readonly<RootLayoutProps>) {
  // const locale = params.locale || nextI18NextConfig.i18n.defaultLocale;

  return (
    // <html lang={locale}> {/* Set lang attribute based on current locale */}
    <html lang="en"> {/* Placeholder lang */}
      <body className={`${inter.variable} ${lato.variable} font-lato`}> {/* Ensure font-lato is applied */}
        <I18nAppProvider /*locale={locale}*/>
          {children}
        </I18nAppProvider>
      </body>
    </html>
  );
}
