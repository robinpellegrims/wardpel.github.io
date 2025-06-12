import type { Metadata } from "next";
import "../globals.css";
import SetLangAttribute from "@/components/SetLangAttribute"; // Added import

export const metadata: Metadata = {
  title: "Ward Pellegrims Coaching",
  description: "Elite level coaching in swimming and triathlon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Hreflang tags for SEO */}
        <link rel="alternate" hrefLang="en" href="https://wardpellegrims.be/" />
        <link rel="alternate" hrefLang="nl" href="https://wardpellegrims.be/nl/" />
        <link rel="alternate" hrefLang="x-default" href="https://wardpellegrims.be/" />
      </head>
      <body className="antialiased">
        <SetLangAttribute />
        {children}
      </body>
    </html>
  );
}