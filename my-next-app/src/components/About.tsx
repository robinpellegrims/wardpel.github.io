"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image'; // Import Next.js Image component

const About: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section id="about" className="pt-16 md:pt-24">
      <div className="image main block h-80 md:h-96 w-full relative overflow-hidden rounded-none" data-position="center">
        {/* Updated to use Next/Image */}
        <Image
          alt={t('aboutTitle', 'Banner image for Ward Pellegrims')}
          src="/images/banner_3840.jpg" // Path relative to public directory
          fill // Replaces sizes, srcset for responsive fill
          style={{ objectFit: 'cover', objectPosition: 'center' }} // objectFit and objectPosition via style prop
          priority // Mark as priority if it's LCP (Largest Contentful Paint)
          // You can still provide a sizes prop if you want more control over image selection
          // For example: sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // For srcSet, Next/Image handles this automatically with quality settings and image optimization.
          // If you have manually created different image files (banner_480.jpg etc.) and want to force their use,
          // you might need a more complex setup or use a simple <img> tag if Next/Image optimization isn't desired for these.
          // For simplicity with Next/Image, we usually provide the highest quality image and let Next.js handle optimization.
        />
      </div>
      <div className="container mx-auto px-6 md:px-8 py-12 md:py-16">
        <header className="major text-center mb-12">
          <h2 className="text-brand-red text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
            {t('aboutTitle', 'Ward Pellegrims')}
          </h2>
          <p className="text-brand-gray-dark text-xl sm:text-2xl md:text-3xl font-bold -mt-1 sm:-mt-2 md:-mt-3">
            {t('aboutSubtitle', 'Improve your swimming, cycling and running performance')}
          </p>
        </header>
        <p className="mb-6 md:mb-9">
          {t('aboutIntro1')}
        </p>
        <p className="mb-6 md:mb-9">
          {t('aboutIntro2')}
        </p>
        <p className="mb-6 md:mb-9">
          {t('aboutIntro3')}
        </p>
        <p className="mb-6 md:mb-9">
          {t('aboutIntro4')}
        </p>
      </div>
    </section>
  );
};

export default About;
