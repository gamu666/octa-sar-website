import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      basePath: '/octa-sar-website',
      assetPrefix: '/octa-sar-website',
      trailingSlash: true,
    }
  : {};

export default nextConfig;
