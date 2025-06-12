import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '',
  images: {
    unoptimized: true
  },
  env: {
    // Make build-time environment variables available
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lc5w0ocAAAAAINj9RiSNuQpeFhf-NQO8uzBexrk',
  }
};

export default nextConfig;
